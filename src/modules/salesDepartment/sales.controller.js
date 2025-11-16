import { customer } from "../../../DB/models/customer.model.js";
import { Employee } from "../../../DB/models/employeeModel.js";
import { api_features } from "../../utils/api_features.utils.js";
import { Error_handler_class } from "../../utils/error-class.utils.js";

export const add_customer = async (req, res, next) => {
  const {
    customer_name,
    company_name,
    phone_number,
    email,
    services,
    status,
    Budget,
    Next_Followup_Date,
    notes,
    assigned_to,
  } = req.body;
  const new_customer = await customer.create({ ...req.body });
  res
    .status(201)
    .json({ message: "customer added successfully", Data: new_customer });
};
export const get_all_customers = async (req, res, next) => {
  const all_customers = customer.find();
  const new_api_feature = new api_features(all_customers, req.query)
    .pagination()
    .sort();
  const find_customer = await new_api_feature.mongoose_query;
  if (!find_customer) {
    return next(
      new Error_handler_class("customers not found", 404, "customers not found")
    );
  }
  res.status(200).json({ message: "all customers found", Data: find_customer });
};
export const get_one_customer = async (req, res, next) => {
  const { _id } = req.params;
  const one_customer = await customer.findById(_id);
  if (!one_customer) {
    return next(
      new Error_handler_class("customer not found", 404, "customer not found")
    );
  }
  res
    .status(200)
    .json({ message: "The customer that found", Data: one_customer });
};
// export const update_customer=async(req,res,next) =>{
//     const{_id}=req.params
    
//     const u_customer
// }