export class LookUpData {
    lookupId!:number;
    lookupTypeId!:number;
    internalname!:string;
    name!:string;
    description!:string;
    text!:string;
    parentKey!:number;
    isChecked:string="none";
    sourceId!:number;
    id!:number;
}


export class MockStageAPIData {
    stageLookUpData: LookUpData[] = [];
    statusLookUpData: LookUpData[] = [];
    closingCoordinatorLookUpData: LookUpData[] = [];
    acusitionManagerLookUpData: LookUpData[] = [];
    getStageMockApiData(): LookUpData[] {
        this.stageLookUpData = [];
        let cancelling: LookUpData = new LookUpData();
        cancelling.description = "Cancelling";
        cancelling.name = "Cancelling";
        cancelling.internalname = "Canc";
        cancelling.lookupTypeId = 1;
        cancelling.lookupId = 1;
        cancelling.text = "Cancelling";
        this.stageLookUpData.push(cancelling);
        let holdBack: LookUpData = new LookUpData();
        holdBack.description = "Hold Back";
        holdBack.name = "Hold Back";
        holdBack.internalname = "HB";
        holdBack.lookupTypeId = 1;
        holdBack.lookupId = 2;
        holdBack.text = "Hold Back";
        this.stageLookUpData.push(holdBack);
        let qCD: LookUpData = new LookUpData();
        qCD.description = "QCD";
        qCD.name = "QCD";
        qCD.internalname = "QC";
        qCD.lookupTypeId = 1;
        qCD.lookupId = 3;
        qCD.text = "QCD";
        this.stageLookUpData.push(qCD);
        let recorded: LookUpData = new LookUpData();
        recorded.description = "Recorded";
        recorded.name = "Recorded";
        recorded.internalname = "Rec";
        recorded.lookupTypeId = 1;
        recorded.lookupId = 4;
        recorded.text = "Recorded";
        this.stageLookUpData.push(recorded);
        let wireRequested: LookUpData = new LookUpData();
        wireRequested.description = "Wire Requested";
        wireRequested.name = "Wire REquested";
        wireRequested.internalname = "Wre";
        wireRequested.lookupTypeId = 1;
        wireRequested.lookupId = 5;
        wireRequested.text = "Wire Requested";
        this.stageLookUpData.push(wireRequested);
        let processing: LookUpData = new LookUpData();
        processing.description = "Processing";
        processing.name = "Processing";
        processing.internalname = "Pro";
        processing.lookupTypeId = 1;
        processing.lookupId = 7;
        processing.text = "Processing";
        this.stageLookUpData.push(processing);
        let inspections: LookUpData = new LookUpData();
        inspections.description = "Inspections";
        inspections.name = "Inspections";
        inspections.internalname = "Ins";
        inspections.lookupTypeId = 1;
        inspections.lookupId = 8;
        inspections.text = "Inspections";
        this.stageLookUpData.push(inspections);
        let onHold: LookUpData = new LookUpData();
        onHold.description = "On Hold";
        onHold.name = "On Hold";
        onHold.internalname = "OnH";
        onHold.lookupTypeId = 1;
        onHold.lookupId = 9;
        onHold.text = "On Hold";
        this.stageLookUpData.push(onHold);
        return this.stageLookUpData;
    }

    getStatusMockApiData(): LookUpData[] {
        this.statusLookUpData = [];
        let docsProcessed: LookUpData = new LookUpData();
        docsProcessed.description = "Docs Processed";
        docsProcessed.name = "Docs Processed";
        docsProcessed.internalname = "Dop";
        docsProcessed.lookupTypeId = 1;
        docsProcessed.lookupId = 1;
        docsProcessed.text = "Docs Processed";
        this.statusLookUpData.push(docsProcessed);
        return this.statusLookUpData;
    }

    getNewStageStatusMockApiData(): LookUpData[] {
        this.statusLookUpData = [];
        let docsProcessed: LookUpData = new LookUpData();
        docsProcessed.description = "In Progress";
        docsProcessed.name = "In Progress";
        docsProcessed.internalname = "In Progress";
        docsProcessed.lookupTypeId = 1;
        docsProcessed.lookupId = 1;
        docsProcessed.text = "Docs Processed";
        this.statusLookUpData.push(docsProcessed);

        let submitted: LookUpData = new LookUpData();
        submitted.description = "Submitted";
        submitted.name = "Submitted";
        submitted.internalname = "Submitted";
        submitted.lookupTypeId = 1;
        submitted.lookupId = 1;
        submitted.text = "Submitted";
        this.statusLookUpData.push(submitted);

        return this.statusLookUpData;
    }

    getAcusitionManagerMockApiData(): LookUpData[] {
        this.acusitionManagerLookUpData = [];
        let sarah: LookUpData = new LookUpData();
        sarah.description = "sarah";
        sarah.name = "sarah";
        sarah.internalname = "sarah";
        sarah.lookupTypeId = 1;
        sarah.lookupId = 1;
        sarah.text = "sarah";
        this.acusitionManagerLookUpData.push(sarah);
        let jordan: LookUpData = new LookUpData();
        jordan.description = "jordan";
        jordan.name = "jordan";
        jordan.internalname = "jordan";
        jordan.lookupTypeId = 1;
        jordan.lookupId = 1;
        jordan.text = "jordan";
        this.acusitionManagerLookUpData.push(jordan);
        return this.acusitionManagerLookUpData;
    }

    getCloosingCoordinatorMockApiData(): LookUpData[] {
        this.closingCoordinatorLookUpData = [];
        let alex: LookUpData = new LookUpData();
        alex.description = "Alex";
        alex.name = "Alex";
        alex.internalname = "Alex";
        alex.lookupTypeId = 1;
        alex.lookupId = 1;
        alex.text = "Alex";
        this.closingCoordinatorLookUpData.push(alex);

        let grace: LookUpData = new LookUpData();
        grace.description = "Grace";
        grace.name = "Grace";
        grace.internalname = "Grace";
        grace.lookupTypeId = 1;
        grace.lookupId = 1;
        grace.text = "Grace";
        this.closingCoordinatorLookUpData.push(grace);
        let zelma: LookUpData = new LookUpData();
        zelma.description = "zelma";
        zelma.name = "zelma";
        zelma.internalname = "zelma";
        zelma.lookupTypeId = 1;
        zelma.lookupId = 1;
        zelma.text = "zelma";
        this.closingCoordinatorLookUpData.push(zelma);
        return this.closingCoordinatorLookUpData;
    }


}