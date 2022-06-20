const Product = require("../models/product");
const { BadRequest, NotFoundError } = require("../error");
const { StatusCodes } = require("http-status-codes");

const getAllProduct = async (req, res) => {
  const { featured, company, name, gender, sort, fields, numericFilters } =
    req.query;
  const queryOject = {};
  if (featured) {
    queryOject.featured = featured === "true" ? true : false;
  }
  if (company) {
    let companies = company.split(",");
    queryOject.company = { $in: companies };
  }
  if (gender) {
    let genders = gender.split(",");
    queryOject.gender = { $in: genders };
  }
  if (name) {
    queryOject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };

    const regularExpression = /\b(<|<=|=|>=|>)\b/g;

    let filters = numericFilters.replace(regularExpression, (match) => {
      return `-${operatorMap[match]}-`;
    });

    console.log(filters);

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((items) => {
      const [field, operator, value] = items.split("-");
      if (options.includes(field)) {
        queryOject[field] = { [operator]: Number(value) };
      }
    });

    console.log(queryOject);
  }

  let result = Product.find(queryOject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result.sort(sortList);
  } else {
    result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  result.skip(skip).limit(limit);

  const products = await result;

  const allProduct = await Product.find(queryOject);
  const totalPage = Math.ceil(allProduct.length / limit);

  res.status(200).json({ products, nbHits: products.length, totalPage });
};

module.exports = {
  getAllProduct,
};
