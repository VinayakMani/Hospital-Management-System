import { Message } from "../models/messageSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

// export const sendMessage = async (req, res, next) => {
//   const { firstName, lastName, email, phone, message } = req.body;

//   if (!firstName || !lastName || !email || !phone || !message) {
//     return res.status(400).json({
//       success: false,
//       message: "Please Fill Full Form",
//     });
//   }

//   await Message.create({ firstName, lastName, email, phone, message });

//   res.status(200).json({
//     success: true,
//     message: "Message Send Successfully",
//   });
// };

//write the code by using the errorMiddleware and catchAsyncErrors

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  await Message.create({ firstName, lastName, email, phone, message });
  res.status(200).json({
    success: true,
    message: "Message Sent!",
  });
});

//for get all message

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});
