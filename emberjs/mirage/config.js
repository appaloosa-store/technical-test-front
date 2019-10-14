import { isPresent, isNone } from '@ember/utils';
import Mirage from 'ember-cli-mirage';

const PER_PAGE = 10;

function sort_data(data, sortCriteria) {
  let sortDirection = /^-/g.test(sortCriteria) ? 'desc' : 'asc';
  let sortProperty = sortCriteria.replace(/^-/g, '');

  data = data.sort((a, b) => {
    return a[sortProperty].localeCompare(b[sortProperty]);
  });
  if (sortDirection === 'desc') {
    data = data.reverse();
  }
  return data
}

function generate_pagination_meta(data, page = 1) {
  page = parseInt(page, 10);

  const total = data.models.length;
    return {
      page,
      total_models: total,
      total_pages: Math.ceil(total / PER_PAGE)
    }
}

function paginate_data(data, pagination) {

  const start = (pagination.page - 1) * PER_PAGE,
    end = start + PER_PAGE;

  data.models = data.models.slice(start, end);
  return data;
}

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  this.timing = 400;
  this.namespace = '/api';    // make this `/api`, for example, if your API is namespaced

  this.get('/mobile-applications', function ({  mobileApplications }, { queryParams }) {
    let data = mobileApplications.all();

    if (queryParams.sort) {
      data.models = sort_data(data.models, queryParams.sort);
    }

    let pagination_data = generate_pagination_meta(data, queryParams.page);
    data = paginate_data(data, pagination_data)

    let json = this.serialize(data);

    json.meta = pagination_data;

    return json;
  });

  this.get('/mobile-applications/:id');

  this.patch('/mobile-applications/:id', function(schema, { params }) {
    let attrs = this.normalizedRequestAttrs();
    let id = params.id;
    let errors = [];

    if (!isNone(attrs["name"]) && !isPresent(attrs["name"])) {
      errors.push({
        source: {
          pointer: "/data/attributes/name"
        },
        title: "Invalid Attribute",
        code: "blank"
      });
    }
    if (attrs['application-type'] === 'native_link' && !isPresent(attrs["url"])) {
      errors.push({
        source: {
          pointer: "/data/attributes/url"
        },
        title: "Invalid Attribute",
        code: "blank"
      });
    }

    if (errors.length !== 0) {
      return new Mirage.Response(422, {}, {
        errors: errors
      });
    } else {
      let mau = schema.mobileApplications.find(id);
      mau = mau.update(attrs);
      return mau;
    }
  });
}
