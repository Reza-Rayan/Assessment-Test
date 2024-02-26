module.exports = class Transform {
  transformCollection(items) {
    if (this.withPaginateStatus) {
      return {
        items: items.docs.map(this.transform.bind(this)),
        ...this.paginateItems(items),
      };
    }
    return items.map(this.transform.bind(this));
  }

  paginateItems(items) {
    return {
      totalDocs: items.totalDocs,
      limit: items.limit,
      totalPages: items.totalPages,
      page: items.page,
    };
  }
  withPaginate() {
    this.withPaginateStatus = true;
    return this;
  }
};
