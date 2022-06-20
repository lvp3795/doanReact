const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Đã có lỗi xảy ra, xin vui lòng thử lại",
  };

  if (err.code && err.code === 11000) {
    if (err.keyValue.email) {
      customError.msg = `Trùng email: ${err.keyValue.email}, xin vui lòng chọn email khác`;
      customError.statusCode = 400;
    } else {
      customError.msg = `Trùng username: ${err.keyValue.username}, xin vui lòng chọn username khác`;
      customError.statusCode = 400;
    }
  }

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  //return res.status(500).json({ err });

  if (err.name === "CastError") {
    customError.msg = `Không có sẩn phẩm với id: ${err.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
