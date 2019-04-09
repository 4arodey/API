const { NotFoundException } = require('../exceptions/notFound.exception');

class Repository {
  constructor(scheme, selectAttrs) {
    this.query = scheme.query();
    this.selectAttrs = selectAttrs;
    this.scheme = scheme;

    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  findAll(selectAttrs) {
    const attributes = this.getAttributes(selectAttrs);

    return this.query.select.apply(this.query, attributes);
  }

  getAttributes(selectAttrs) {
    return Array.isArray(selectAttrs) ? selectAttrs : this.selectAttrs;
  }

  findById(id, selectAttrs) {
    return this.findOne({ id }, selectAttrs);
  }

  findOne(id, selectAttrs) {
    const attributes = this.getAttributes(selectAttrs);
    return this.query
        .findOne(id)
        .select.apply(this.query, attributes)
        .then((targetEntity) => {
          if (!targetEntity) {
            throw new NotFoundException(`В таблице ${this.scheme.tableName} Сущность с ${id} не найдена`);
          }
          return targetEntity;
        });
  }

  create(entity) {
    return this.query.insert(entity);
  }

  update(id, updatedEntity) {
    return this.findById(id)
      .then(() => this.query.findById(id).update(updatedEntity));
  }

  remove(id) {
    return this
      .findById(id)
      .then(() => this.query.deleteById(id));
  }
}


module.exports = Repository;
