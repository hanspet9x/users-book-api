import express, { Request, Response } from "express";
import { validateSchemaMiddleware } from "../../middleware/schemaValidation.midw";
import { Routes } from "../../routes/routes";
import { ResponseService } from "../../services/response/ResponseService";
import { IUtilityAdd } from "../../services/utility/interface/IUtilityAdd";
import { UtilityService } from "../../services/utility/UtilityService";
import { getErrorMessage } from "../../utils/utils";
import { UtilitySchema } from "./schema";

const UtilityController = express.Router();

UtilityController.route("/")
  .get(async (req, res) => {
    try {
      const data = await UtilityService.get();
      ResponseService.json(res, data, 200);
    } catch (error) {
      ResponseService.send400(res, getErrorMessage(error));
    }
  })
  .post(
    validateSchemaMiddleware(UtilitySchema.add),
    (req: Request, res: Response) => {
      try {
        const data: IUtilityAdd = req.body;
        UtilityService.add(data);
        ResponseService.json(
          res,
          "service Id " +
            UtilityService.createServiceID(data.head, data.subHead),
          200
        );
      } catch (error) {
        ResponseService.send400(res, getErrorMessage(error));
      }
    }
  )
  .put(
    validateSchemaMiddleware(UtilitySchema.add),
    (req: Request, res: Response) => {
      try {
        const data: IUtilityAdd = req.body;
        UtilityService.update(data);
        ResponseService.json(
          res,
          "service Id " +
            UtilityService.createServiceID(data.head, data.subHead),
          200
        );
      } catch (error) {
        ResponseService.send400(res, getErrorMessage(error));
      }
    }
  );

  UtilityController.get(Routes.INTERSWITCH_UTILITIES, async (req: Request, res: Response) => {
    try {
      const data = await UtilityService.getInterswitch();
      ResponseService.sendAsXML(res, data, 200);
    } catch (error) {
      ResponseService.send400(res, getErrorMessage(error));
    }
  })

export default UtilityController;
