export namespace LookUpTypes {
    export enum LookupTypeIds {
        DocStatus = 1,
        COEOCCStatus = 2,
        OCC_COE_Category = 3,
        Status = 4,
        Stage = 5,
        Prelim_Disclosures = 4,
        Seller_Disclosures = 5,
        HOA_Cert = 6,
        Sale_Type = 8,
        Source = 9,
        Occupancy_Contract_Status = 10,
        Occupancy_Types = 11,
        Solar_Ownership_Status = 12,
        Wire_Request_Status = 13,
        InspectionStatus = 14,
        Wire_Type = 15,
        ApprovalStatus = 16,
        InspectionTypes = 17,
        Wire_Date = 18,
        propertyConditionatCOE = 19,
        Post_COE_Date = 20,
        AccountType = 21,
        ContactType = 22,
        Septic_Inspection_Status = 23,

    }
    export enum StorageKeys {
        lookupData = 'lookup-data',
        statusLookupData = 'statusLookUpData'
    }
    export enum InspectionStatusEnums {
        Not_Started = 79,
        Requested = 80,
        passed = 81,
        failed = 82,
    }
    export enum ApprovalType {
        Manual = 1,
        Escalation = 2,
        Proxy=3,
        Auto = 0,
     
    }
    export enum ApproverRequests {
        "My Requests" = "My Requests",
        "All Requests" = "All Requests"
    }
    export enum ContatcsLookupTypes {
        AccountTypes = 3,
        ContactTypes = 4,
        ContactClassification = 5,
    }
    export enum AccountLookupType {
        buyeragent = 105,
        listingagent = 106,
        wholesaler = 107,
        relistagent = 108,
        escrowcompany = 109,
        escrowofficer = 110,
        titlecompany = 111,

    }
    export enum ContactTypesInternalName {
        BuyerAgent = 'buyer_agent',
        ListingAgent = 'listing_agent',
        RelistAgent = 'relist_agent',
        WholeSaler = 'wholesaler',
        DirectSeller = 'direct_seller',
        TitleCompany = 'title_company',
        ClosingCompany = 'escrow_company',
        ClosingOfficer = 'escrow_officer',

    }
    export enum ApprovalLookup {
        Proxy_Approval = 125
    }    export enum DocStatus {
        NEW = 4,
        PENDING = 5,
        EXECUTED = 6,
    }}
