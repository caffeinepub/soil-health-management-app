import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ComprehensiveSoilHealthCard,
  MeasurementType,
  SoilMeasurement,
  UserProfile,
} from "../backend";
import { useActor } from "./useActor";

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useGetAllMeasurements() {
  const { actor, isFetching } = useActor();

  return useQuery<SoilMeasurement[]>({
    queryKey: ["measurements"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllUserMeasurements();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddSoilMeasurement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      ph: number;
      ec: number;
      oc: number;
      om: number;
      nitrogen: number;
      phosphorus: number;
      potassium: number;
      sulfur: number;
      calcium: number;
      magnesium: number;
      sodium: number;
      fe: number;
      mn: number;
      zn: number;
      cu: number;
      cec: number;
      nKgPerBed: number;
      pKgPerBed: number;
      kKgPerBed: number;
      measurementType: MeasurementType;
      notes: string | null;
      referenceId: bigint | null;
      location: string | null;
      soilType: string | null;
      date: bigint;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addSoilMeasurement(
        params.ph,
        params.ec,
        params.oc,
        params.om,
        params.nitrogen,
        params.phosphorus,
        params.potassium,
        params.sulfur,
        params.calcium,
        params.magnesium,
        params.sodium,
        params.fe,
        params.mn,
        params.zn,
        params.cu,
        params.cec,
        params.nKgPerBed,
        params.pKgPerBed,
        params.kKgPerBed,
        params.measurementType,
        params.notes,
        params.referenceId,
        params.location,
        params.soilType,
        params.date,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["measurements"] });
      queryClient.invalidateQueries({ queryKey: ["healthCard"] });
    },
  });
}

export function useGetComprehensiveSoilHealthCard() {
  const { actor, isFetching } = useActor();

  return useQuery<ComprehensiveSoilHealthCard | null>({
    queryKey: ["healthCard"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getComprehensiveSoilHealthCard();
    },
    enabled: !!actor && !isFetching,
  });
}
