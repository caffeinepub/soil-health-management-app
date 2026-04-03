import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import List "mo:core/List";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  // Custom Types
  type SoilMeasurement = {
    date : Time.Time;
    ph : Float;
    ec : Float;
    oc : Float;
    om : Float;
    nitrogen : Float;
    phosphorus : Float;
    potassium : Float;
    sulfur : Float;
    calcium : Float;
    magnesium : Float;
    sodium : Float;
    fe : Float;
    mn : Float;
    zn : Float;
    cu : Float;
    cec : Float;
    nKgPerBed : Float;
    pKgPerBed : Float;
    kKgPerBed : Float;
    measurementType : MeasurementType; // before/after + reference
    notes : ?Text;
    referenceId : ?Nat; // Measurement cycle/treatment id
    location : ?Text;
    soilType : ?Text;
  };

  module SoilMeasurement {
    public func compare(measurement1 : SoilMeasurement, measurement2 : SoilMeasurement) : Order.Order {
      Int.compare(measurement1.date, measurement2.date);
    };
  };

  type MeasurementType = {
    #before;
    #after;
    #reference;
    #daily;
  };

  module MeasurementType {
    public func compare(a : MeasurementType, b : MeasurementType) : Order.Order {
      switch (a, b) {
        case (#before, #after) { #less };
        case (#after, #before) { #greater };
        case (#before, #reference) { #less };
        case (#reference, #before) { #greater };
        case (#before, #daily) { #less };
        case (#daily, #before) { #greater };
        case (#after, #reference) { #less };
        case (#reference, #after) { #greater };
        case (#after, #daily) { #less };
        case (#daily, #after) { #greater };
        case (#reference, #daily) { #less };
        case (#daily, #reference) { #greater };
        case (_, _) { #equal };
      };
    };
  };

  type AverageSoilParameters = {
    avgPh : Float;
    avgEc : Float;
    avgOc : Float;
    avgOm : Float;
    avgNitrogen : Float;
    avgPhosphorus : Float;
    avgPotassium : Float;
    avgSulfur : Float;
    avgCalcium : Float;
    avgMagnesium : Float;
    avgSodium : Float;
    avgFe : Float;
    avgMn : Float;
    avgZn : Float;
    avgCu : Float;
    avgCec : Float;
    avgNkgPerBed : Float;
    avgPkgPerBed : Float;
    avgKkgPerBed : Float;
  };

  type TrendAnalysis = {
    phTrend : Text;
    ecTrend : Text;
    ocTrend : Text;
    omTrend : Text;
    nitrogenTrend : Text;
    phosphorusTrend : Text;
    potassiumTrend : Text;
    sulfurTrend : Text;
    calciumTrend : Text;
    magnesiumTrend : Text;
    sodiumTrend : Text;
    feTrend : Text;
    mnTrend : Text;
    znTrend : Text;
    cuTrend : Text;
    cecTrend : Text;
    nKgPerBedTrend : Text;
    pKgPerBedTrend : Text;
    kKgPerBedTrend : Text;
    totalNutrientTrend : Text;
  };

  type ParameterComparison = {
    before : Float;
    after : Float;
    difference : Float;
    percentageChange : Float;
    trend : Text;
  };

  type ComprehensiveSoilHealthCard = {
    analysis : TrendAnalysis;
    parameterComparisons : ParameterComparisonCard;
    averages : AverageSoilParameters;
    overallComparison : ParameterComparison;
    status : Text;
    recentMeasurements : [SoilMeasurement];
    beforeMeasurement : ?SoilMeasurement;
    afterMeasurement : ?SoilMeasurement;
    referenceMeasurement : ?SoilMeasurement;
  };

  type ParameterComparisonCard = {
    phComparison : ParameterComparison;
    ecComparison : ParameterComparison;
    ocComparison : ParameterComparison;
    omComparison : ParameterComparison;
    nitrogenComparison : ParameterComparison;
    phosphorusComparison : ParameterComparison;
    potassiumComparison : ParameterComparison;
    sulfurComparison : ParameterComparison;
    calciumComparison : ParameterComparison;
    magnesiumComparison : ParameterComparison;
    sodiumComparison : ParameterComparison;
    feComparison : ParameterComparison;
    mnComparison : ParameterComparison;
    znComparison : ParameterComparison;
    cuComparison : ParameterComparison;
    cecComparison : ParameterComparison;
    nKgPerBedComparison : ParameterComparison;
    pKgPerBedComparison : ParameterComparison;
    kKgPerBedComparison : ParameterComparison;
  };

  type NutrientRecommendations = {
    nitrogenRecommendation : Text;
    pKgPerBedRecommendation : Text;
    potassiumRecommendation : Text;
    organicMatterRecommendation : Text;
    soilAssessment : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  let measurements = Map.empty<Principal, [SoilMeasurement]>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Authorization State Setup
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Soil Measurement Functions
  public shared ({ caller }) func addSoilMeasurement(
    ph : Float,
    ec : Float,
    oc : Float,
    om : Float,
    nitrogen : Float,
    phosphorus : Float,
    potassium : Float,
    sulfur : Float,
    calcium : Float,
    magnesium : Float,
    sodium : Float,
    fe : Float,
    mn : Float,
    zn : Float,
    cu : Float,
    cec : Float,
    nKgPerBed : Float,
    pKgPerBed : Float,
    kKgPerBed : Float,
    measurementType : MeasurementType,
    notes : ?Text,
    referenceId : ?Nat,
    location : ?Text,
    soilType : ?Text,
    date : Time.Time,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add soil measurements");
    };

    let measurement : SoilMeasurement = {
      ph;
      ec;
      oc;
      om;
      nitrogen;
      phosphorus;
      potassium;
      sulfur;
      calcium;
      magnesium;
      sodium;
      fe;
      mn;
      zn;
      cu;
      cec;
      nKgPerBed;
      pKgPerBed;
      kKgPerBed;
      measurementType;
      notes;
      referenceId;
      location;
      soilType;
      date;
    };

    let currentMeasurements = switch (measurements.get(caller)) {
      case (null) { [] };
      case (?existing) { existing };
    };

    let newMeasurements = currentMeasurements.concat([measurement]);
    measurements.add(caller, newMeasurements);
  };

  public query ({ caller }) func getAllUserMeasurements() : async [SoilMeasurement] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view soil measurements");
    };

    switch (measurements.get(caller)) {
      case (null) { [] };
      case (?existing) { existing };
    };
  };

  public query ({ caller }) func getMeasurementsByLocation(location : Text) : async [SoilMeasurement] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view soil measurements");
    };

    switch (measurements.get(caller)) {
      case (null) { [] };
      case (?existing) {
        existing.filter(
          func(measurement) {
            switch (measurement.location) {
              case (null) { false };
              case (?loc) { Text.equal(loc, location) };
            };
          }
        );
      };
    };
  };

  public query ({ caller }) func getComprehensiveSoilHealthCard(
  ) : async ?ComprehensiveSoilHealthCard {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view soil health cards");
    };

    switch (measurements.get(caller)) {
      case (null) { null };
      case (?userMeasurements) {
        let measurementList = List.fromArray<SoilMeasurement>(userMeasurements);

        let recentMeasurements =
          if (userMeasurements.size() > 5) {
            userMeasurements.sliceToArray(0, 5);
          } else {
            userMeasurements.sliceToArray(0, userMeasurements.size());
          };

        let beforeList = createSortedListIfNotEmpty(measurementList.filter(func(p) { p.measurementType == #before }), 0);
        let afterList = createSortedListIfNotEmpty(measurementList.filter(func(p) { p.measurementType == #after }), 0);
        let referenceList = createSortedListIfNotEmpty(measurementList.filter(func(p) { p.measurementType == #reference }), 0);

        let beforeMeasurement = safeListValueAtIndex(beforeList, 0);
        let afterMeasurement = safeListValueAtIndex(afterList, 0);
        let referenceMeasurement = safeListValueAtIndex(referenceList, 0);

        let trends = calculateTrends(userMeasurements);

        let sortMeasurementListByType = func(list : List.List<SoilMeasurement>, _ : MeasurementType) : List.List<SoilMeasurement> {
          list.sort(compareByMeasurementType);
        };

        let parameterComparisons = calculateParameterComparisons(
          beforeMeasurement,
          afterMeasurement,
        );
        let averages = calculateAverages(userMeasurements);

        let overallComparison = calculateOverallComparison(parameterComparisons);
        let overallStatus = calculateOverallStatus(parameterComparisons);

        let healthCard = {
          analysis = trends;
          parameterComparisons;
          averages;
          overallComparison;
          status = overallStatus;
          recentMeasurements;
          beforeMeasurement;
          afterMeasurement;
          referenceMeasurement;
        };

        ?healthCard;
      };
    };
  };

  func compareByMeasurementType(a : SoilMeasurement, b : SoilMeasurement) : Order.Order {
    MeasurementType.compare(a.measurementType, b.measurementType);
  };

  func safeListValueAtIndex(
    list : List.List<SoilMeasurement>,
    index : Nat,
  ) : ?SoilMeasurement {
    if (list.isEmpty() or (index >= list.size())) {
      null;
    } else {
      ?list.at(index);
    };
  };

  func createSortedListIfNotEmpty(
    originalList : List.List<SoilMeasurement>,
    _ : Nat,
  ) : List.List<SoilMeasurement> {
    if (originalList.isEmpty()) {
      originalList;
    } else {
      originalList.sort(compareByMeasurementType);
    };
  };

  // Helper Functions
  func calculateTrends(measurements : [SoilMeasurement]) : TrendAnalysis {
    if (measurements.size() < 2) {
      return emptyTrends();
    };

    let first = measurements[0];
    let last = measurements[measurements.size() - 1];

    {
      phTrend = getTrend(last.ph, first.ph);
      ecTrend = getTrend(last.ec, first.ec);
      ocTrend = getTrend(last.oc, first.oc);
      omTrend = getTrend(last.om, first.om);
      nitrogenTrend = getTrend(last.nitrogen, first.nitrogen);
      phosphorusTrend = getTrend(last.phosphorus, first.phosphorus);
      potassiumTrend = getTrend(last.potassium, first.potassium);
      sulfurTrend = getTrend(last.sulfur, first.sulfur);
      calciumTrend = getTrend(last.calcium, first.calcium);
      magnesiumTrend = getTrend(last.magnesium, first.magnesium);
      sodiumTrend = getTrend(last.sodium, first.sodium);
      feTrend = getTrend(last.fe, first.fe);
      mnTrend = getTrend(last.mn, first.mn);
      znTrend = getTrend(last.zn, first.zn);
      cuTrend = getTrend(last.cu, first.cu);
      cecTrend = getTrend(last.cec, first.cec);
      nKgPerBedTrend = getTrend(last.nKgPerBed, first.nKgPerBed);
      pKgPerBedTrend = getTrend(last.pKgPerBed, first.pKgPerBed);
      kKgPerBedTrend = getTrend(last.kKgPerBed, first.kKgPerBed);
      totalNutrientTrend = getTrend(
        last.nKgPerBed + last.pKgPerBed + last.kKgPerBed,
        first.nKgPerBed + first.pKgPerBed + first.kKgPerBed,
      );
    };
  };

  func getTrend(newValue : Float, oldValue : Float) : Text {
    if (oldValue == 0.0) { return "stable" };

    let diff = newValue - oldValue;
    let relativeChange = diff / oldValue;

    if (relativeChange > 0.05) { "improving" } else if (relativeChange < -0.05) {
      "declining";
    } else { "stable" };
  };

  func calculateAverages(measurements : [SoilMeasurement]) : AverageSoilParameters {
    if (measurements.isEmpty()) {
      return emptyAverages();
    };

    let sumPh = measurements.foldLeft(0.0, func(acc, m) { acc + m.ph });
    let sumEc = measurements.foldLeft(0.0, func(acc, m) { acc + m.ec });
    let sumOc = measurements.foldLeft(0.0, func(acc, m) { acc + m.oc });
    let sumOm = measurements.foldLeft(0.0, func(acc, m) { acc + m.om });
    let sumNitrogen = measurements.foldLeft(0.0, func(acc, m) { acc + m.nitrogen });
    let sumPhosphorus = measurements.foldLeft(0.0, func(acc, m) { acc + m.phosphorus });
    let sumPotassium = measurements.foldLeft(0.0, func(acc, m) { acc + m.potassium });
    let sumSulfur = measurements.foldLeft(0.0, func(acc, m) { acc + m.sulfur });
    let sumCalcium = measurements.foldLeft(0.0, func(acc, m) { acc + m.calcium });
    let sumMagnesium = measurements.foldLeft(0.0, func(acc, m) { acc + m.magnesium });
    let sumSodium = measurements.foldLeft(0.0, func(acc, m) { acc + m.sodium });
    let sumFe = measurements.foldLeft(0.0, func(acc, m) { acc + m.fe });
    let sumMn = measurements.foldLeft(0.0, func(acc, m) { acc + m.mn });
    let sumZn = measurements.foldLeft(0.0, func(acc, m) { acc + m.zn });
    let sumCu = measurements.foldLeft(0.0, func(acc, m) { acc + m.cu });
    let sumCec = measurements.foldLeft(0.0, func(acc, m) { acc + m.cec });
    let sumNkgPerBed = measurements.foldLeft(0.0, func(acc, m) { acc + m.nKgPerBed });
    let sumPkgPerBed = measurements.foldLeft(0.0, func(acc, m) { acc + m.pKgPerBed });
    let sumKkgPerBed = measurements.foldLeft(0.0, func(acc, m) { acc + m.kKgPerBed });

    let count = measurements.size().toFloat();

    {
      avgPh = sumPh / count;
      avgEc = sumEc / count;
      avgOc = sumOc / count;
      avgOm = sumOm / count;
      avgNitrogen = sumNitrogen / count;
      avgPhosphorus = sumPhosphorus / count;
      avgPotassium = sumPotassium / count;
      avgSulfur = sumSulfur / count;
      avgCalcium = sumCalcium / count;
      avgMagnesium = sumMagnesium / count;
      avgSodium = sumSodium / count;
      avgFe = sumFe / count;
      avgMn = sumMn / count;
      avgZn = sumZn / count;
      avgCu = sumCu / count;
      avgCec = sumCec / count;
      avgNkgPerBed = sumNkgPerBed / count;
      avgPkgPerBed = sumPkgPerBed / count;
      avgKkgPerBed = sumKkgPerBed / count;
    };
  };

  func calculateParameterComparisons(
    beforeMeasurement : ?SoilMeasurement,
    afterMeasurement : ?SoilMeasurement,
  ) : ParameterComparisonCard {
    let defaultComparison = {
      before = 0.0;
      after = 0.0;
      difference = 0.0;
      percentageChange = 0.0;
      trend = "no comparison";
    };

    let comparisonFunc = func(
      beforeValue : Float,
      afterValue : Float,
    ) : ParameterComparison {
      let difference = afterValue - beforeValue;
      let percentageChange = if (beforeValue == 0.0) { 0.0 } else {
        (difference / beforeValue) * 100.0;
      };

      let trend = if (percentageChange > 5.0) {
        "improving";
      } else if (percentageChange < -5.0) {
        "declining";
      } else {
        "stable";
      };

      {
        before = beforeValue;
        after = afterValue;
        difference;
        percentageChange;
        trend;
      };
    };

    func safeComparison(getValue : (SoilMeasurement) -> Float) : ParameterComparison {
      switch (beforeMeasurement, afterMeasurement) {
        case (?beforeM, ?afterM) {
          comparisonFunc(getValue(beforeM), getValue(afterM));
        };
        case (_) { defaultComparison };
      };
    };

    {
      phComparison = safeComparison(func(m) { m.ph });
      ecComparison = safeComparison(func(m) { m.ec });
      ocComparison = safeComparison(func(m) { m.oc });
      omComparison = safeComparison(func(m) { m.om });
      nitrogenComparison = safeComparison(func(m) { m.nitrogen });
      phosphorusComparison = safeComparison(func(m) { m.phosphorus });
      potassiumComparison = safeComparison(func(m) { m.potassium });
      sulfurComparison = safeComparison(func(m) { m.sulfur });
      calciumComparison = safeComparison(func(m) { m.calcium });
      magnesiumComparison = safeComparison(func(m) { m.magnesium });
      sodiumComparison = safeComparison(func(m) { m.sodium });
      feComparison = safeComparison(func(m) { m.fe });
      mnComparison = safeComparison(func(m) { m.mn });
      znComparison = safeComparison(func(m) { m.zn });
      cuComparison = safeComparison(func(m) { m.cu });
      cecComparison = safeComparison(func(m) { m.cec });
      nKgPerBedComparison = safeComparison(func(m) { m.nKgPerBed });
      pKgPerBedComparison = safeComparison(func(m) { m.pKgPerBed });
      kKgPerBedComparison = safeComparison(func(m) { m.kKgPerBed });
    };
  };

  func calculateOverallComparison(
    parameterComparisons : ParameterComparisonCard,
  ) : ParameterComparison {
    let totalBefore = parameterComparisons.nKgPerBedComparison.before +
      parameterComparisons.pKgPerBedComparison.before +
      parameterComparisons.kKgPerBedComparison.before;
    let totalAfter = parameterComparisons.nKgPerBedComparison.after +
      parameterComparisons.pKgPerBedComparison.after +
      parameterComparisons.kKgPerBedComparison.after;

    let difference = totalAfter - totalBefore;
    let percentageChange = if (totalBefore == 0.0) { 0.0 } else {
      (difference / totalBefore) * 100.0;
    };

    let trend = if (percentageChange > 5.0) {
      "improving";
    } else if (percentageChange < -5.0) {
      "declining";
    } else {
      "stable";
    };

    {
      before = totalBefore;
      after = totalAfter;
      difference;
      percentageChange;
      trend;
    };
  };

  func calculateOverallStatus(_ : ParameterComparisonCard) : Text { "healthy" };

  func emptyTrends() : TrendAnalysis {
    {
      phTrend = "stable";
      ecTrend = "stable";
      ocTrend = "stable";
      omTrend = "stable";
      nitrogenTrend = "stable";
      phosphorusTrend = "stable";
      potassiumTrend = "stable";
      sulfurTrend = "stable";
      calciumTrend = "stable";
      magnesiumTrend = "stable";
      sodiumTrend = "stable";
      feTrend = "stable";
      mnTrend = "stable";
      znTrend = "stable";
      cuTrend = "stable";
      cecTrend = "stable";
      nKgPerBedTrend = "stable";
      pKgPerBedTrend = "stable";
      kKgPerBedTrend = "stable";
      totalNutrientTrend = "stable";
    };
  };

  func emptyAverages() : AverageSoilParameters {
    {
      avgPh = 0.0;
      avgEc = 0.0;
      avgOc = 0.0;
      avgOm = 0.0;
      avgNitrogen = 0.0;
      avgPhosphorus = 0.0;
      avgPotassium = 0.0;
      avgSulfur = 0.0;
      avgCalcium = 0.0;
      avgMagnesium = 0.0;
      avgSodium = 0.0;
      avgFe = 0.0;
      avgMn = 0.0;
      avgZn = 0.0;
      avgCu = 0.0;
      avgCec = 0.0;
      avgNkgPerBed = 0.0;
      avgPkgPerBed = 0.0;
      avgKkgPerBed = 0.0;
    };
  };
};
