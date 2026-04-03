import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface ParameterComparison {
    trend: string;
    after: number;
    difference: number;
    percentageChange: number;
    before: number;
}
export interface TrendAnalysis {
    kKgPerBedTrend: string;
    phosphorusTrend: string;
    totalNutrientTrend: string;
    omTrend: string;
    ocTrend: string;
    mnTrend: string;
    sodiumTrend: string;
    nKgPerBedTrend: string;
    phTrend: string;
    znTrend: string;
    magnesiumTrend: string;
    nitrogenTrend: string;
    cuTrend: string;
    feTrend: string;
    ecTrend: string;
    calciumTrend: string;
    cecTrend: string;
    sulfurTrend: string;
    potassiumTrend: string;
    pKgPerBedTrend: string;
}
export interface ComprehensiveSoilHealthCard {
    status: string;
    averages: AverageSoilParameters;
    afterMeasurement?: SoilMeasurement;
    parameterComparisons: ParameterComparisonCard;
    recentMeasurements: Array<SoilMeasurement>;
    overallComparison: ParameterComparison;
    beforeMeasurement?: SoilMeasurement;
    analysis: TrendAnalysis;
    referenceMeasurement?: SoilMeasurement;
}
export interface SoilMeasurement {
    cu: number;
    ec: number;
    fe: number;
    mn: number;
    oc: number;
    om: number;
    ph: number;
    zn: number;
    cec: number;
    kKgPerBed: number;
    soilType?: string;
    sodium: number;
    pKgPerBed: number;
    potassium: number;
    phosphorus: number;
    date: Time;
    calcium: number;
    referenceId?: bigint;
    nKgPerBed: number;
    notes?: string;
    sulfur: number;
    magnesium: number;
    measurementType: MeasurementType;
    location?: string;
    nitrogen: number;
}
export interface ParameterComparisonCard {
    nitrogenComparison: ParameterComparison;
    feComparison: ParameterComparison;
    phComparison: ParameterComparison;
    magnesiumComparison: ParameterComparison;
    kKgPerBedComparison: ParameterComparison;
    nKgPerBedComparison: ParameterComparison;
    pKgPerBedComparison: ParameterComparison;
    cuComparison: ParameterComparison;
    ocComparison: ParameterComparison;
    mnComparison: ParameterComparison;
    omComparison: ParameterComparison;
    sodiumComparison: ParameterComparison;
    znComparison: ParameterComparison;
    phosphorusComparison: ParameterComparison;
    cecComparison: ParameterComparison;
    ecComparison: ParameterComparison;
    calciumComparison: ParameterComparison;
    potassiumComparison: ParameterComparison;
    sulfurComparison: ParameterComparison;
}
export interface UserProfile {
    name: string;
}
export interface AverageSoilParameters {
    avgNkgPerBed: number;
    avgNitrogen: number;
    avgCu: number;
    avgEc: number;
    avgFe: number;
    avgMn: number;
    avgOc: number;
    avgOm: number;
    avgPh: number;
    avgZn: number;
    avgCalcium: number;
    avgSodium: number;
    avgPotassium: number;
    avgKkgPerBed: number;
    avgPkgPerBed: number;
    avgPhosphorus: number;
    avgSulfur: number;
    avgMagnesium: number;
    avgCec: number;
}
export enum MeasurementType {
    after = "after",
    reference = "reference",
    before = "before",
    daily = "daily"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addSoilMeasurement(ph: number, ec: number, oc: number, om: number, nitrogen: number, phosphorus: number, potassium: number, sulfur: number, calcium: number, magnesium: number, sodium: number, fe: number, mn: number, zn: number, cu: number, cec: number, nKgPerBed: number, pKgPerBed: number, kKgPerBed: number, measurementType: MeasurementType, notes: string | null, referenceId: bigint | null, location: string | null, soilType: string | null, date: Time): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllUserMeasurements(): Promise<Array<SoilMeasurement>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getComprehensiveSoilHealthCard(): Promise<ComprehensiveSoilHealthCard | null>;
    getMeasurementsByLocation(location: string): Promise<Array<SoilMeasurement>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
