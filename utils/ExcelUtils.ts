import xlsx from 'xlsx'

export class ExcelUtils{

    // filePath
    // sheetname
   
    static getExcelData(filePath : string, sheetName:string){
        try{
        const workbook = xlsx.readFile(filePath)
        const sheet = workbook.Sheets[sheetName]
        const jsonData = xlsx.utils.sheet_to_json(sheet)
        return jsonData
        }
        catch(error){
            console.log(error);
        }
    }
}