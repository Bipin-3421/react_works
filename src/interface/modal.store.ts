import { TMember } from "@/schema/members.schema";
import { ModalIds } from "@/types";

/**
 * Modal data map
 * Description: This is a map of modal ids to their respective data types.
 * This is used to type the data that is passed to the modal when it is opened.
 */
export interface ModalDataMap {
  [ModalIds.ADD_USER]: undefined;
  [ModalIds.UPDATE_USER]: TMember;
}
