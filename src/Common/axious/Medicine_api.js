import { sendRequest } from "../Request"


export const getAllMedicines = () => {
    sendRequest('medicines')
}