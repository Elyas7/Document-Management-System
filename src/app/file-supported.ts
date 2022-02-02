export class SupportedFileTypes {

    filesSupportedHeaders: fileHeader[] = [
        { name: 'supportedExt', extension: "xlsx,xls,csv,docx,doc,jpeg,jpg,png,pdf,ppt,pptx,msg" }
    ];
    getallSupportedTypes(): fileColumn[] {
        let fileColumns: fileColumn[] = [];
        for (let i = 0; i < this.filesSupportedHeaders.length; i++) {
            let filecolumn: fileHeader = new fileHeader();
            filecolumn.name = this.filesSupportedHeaders[i].name;
            filecolumn.extension = this.filesSupportedHeaders[i].extension;
            fileColumns.push(filecolumn);
        };
        return fileColumns;
    }

}
export class fileHeader {
    name!: string;
    extension!: string;
}
export class fileColumn {
    name!: string;
    extension!: string;
}