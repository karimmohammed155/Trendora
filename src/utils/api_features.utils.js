export class api_features {
  constructor(mongoose_query, query) {
    this.mongoose_query = mongoose_query;
    this.query = query;
  }

  //sort
  sort() {
    this.mongoose_query.sort({ createdAt: -1 });
    return this;
  }

  //pagination
  pagination() {
    const { page = 1, limit = 2 } = this.query;
    const skip = (page - 1) * limit;

    this.mongoose_query.skip(skip).limit(limit);

    return this;
  }

  //filters
  filters() {
    const { page = 1, limit = 2, sort, query, ...filters } = this.query;
    const filterQuery = {};
    if (filters.status) filterQuery.status = filters.status;
    if (filters.assigned_to) filterQuery.assigned_to = filters.assigned_to;
    this.mongoose_query.find(filterQuery);
    return this;
  }

  filterByStatus() {
    const { status } = this.query;
    if (status) {
      this.mongoose_query = this.mongoose_query.find({ status });
    }
    return this;
  }
}
