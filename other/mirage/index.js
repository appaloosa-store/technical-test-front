import { Server, JSONAPISerializer, Model, Response } from "@miragejs/server";
import mobileApplications from "./mobile-applications.json";

function sort_data(data, sortCriteria) {
  let sortDirection = /^-/g.test(sortCriteria) ? "desc" : "asc";
  let sortProperty = sortCriteria.replace(/^-/g, "");
  data = data.sort((a, b) => {
    return a[sortProperty].localeCompare(b[sortProperty]);
  });
  if (sortDirection === "desc") {
    data = data.reverse();
  }
  return data;
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

const PER_PAGE = 10;

const server = new Server({
  serializers: {
    application: JSONAPISerializer
  },
  models: {
    "mobile-application": Model
  },
  fixtures:{
    mobileApplications
  },

  baseConfig() {
    this.timing = 1000;
    this.namespace = "api";

    this.get("/mobile-applications", function ({ mobileApplications }, { queryParams }) {
      let data = mobileApplications.all();
      if (queryParams.sort) {
        data.models = sort_data(data.models, queryParams.sort);
      }

      let pagination_data = generate_pagination_meta(data, queryParams.page);
      data = paginate_data(data, pagination_data)

      let json = this.serialize(data, "application");

      json.meta = pagination_data;
      return json;
    });

    this.get("/mobile-applications/:id");
    this.post("/mobile-applications/:id");
    this.patch("/mobile-applications/:id", function(schema, { params, requestBody}) {
      let attrs = this.normalizedRequestAttrs("mobile-application");
      const id = params.id;
      let errors = [];
      
      if (attrs["name"] !== undefined && attrs["name"].trim() === "") {
        errors.push({
          source: {
            pointer: "/data/attributes/name"
          },
          title: "Invalid Attribute",
          code: "blank"
        });
      }
      if (attrs["application-type"] === "native_link" && attrs["url"] !== undefined && attrs["url"].trim() === "") {
        errors.push({
          source: {
            pointer: "/data/attributes/url"
          },
          title: "Invalid Attribute",
          code: "blank"
        });
      }

      if (errors.length !== 0) {
        return new Response(422, {}, {
          errors
        });
      } else {
        let mau = schema.mobileApplications.find(id);
        mau = mau.update(attrs);
        return mau;
      }
    });

  }
})
export default server;