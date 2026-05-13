import { createActor } from "@/backend";
import type {
  BillFilter,
  BillId,
  BillStatus,
  ClassId,
  ClassInput,
  FeeStructureId,
  FeeStructureInput,
  NotificationId,
  PaymentFilter,
  PaymentInput,
  ReceiptFilter,
  StudentFilter,
  StudentId,
  StudentInput,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useBackendActor() {
  const { actor, isFetching } = useActor(createActor);
  return { actor, actorReady: !!actor && !isFetching };
}

export function useStudents(filter: StudentFilter = {}) {
  const { actor, actorReady } = useBackendActor();
  return useQuery({
    queryKey: ["students", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStudents(filter);
    },
    enabled: actorReady,
  });
}

export function useStudent(id: StudentId) {
  const { actor, actorReady } = useBackendActor();
  return useQuery({
    queryKey: ["student", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStudent(id);
    },
    enabled: actorReady && id > 0n,
  });
}

export function useClasses(academicYear?: string) {
  const { actor, actorReady } = useBackendActor();
  return useQuery({
    queryKey: ["classes", academicYear],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getClasses(academicYear ?? null);
    },
    enabled: actorReady,
  });
}

export function useFeeStructures(classId?: ClassId, academicYear?: string) {
  const { actor, actorReady } = useBackendActor();
  return useQuery({
    queryKey: ["feeStructures", classId?.toString(), academicYear],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeeStructures(classId ?? null, academicYear ?? null);
    },
    enabled: actorReady,
  });
}

export function useBills(filter: BillFilter = {}) {
  const { actor, actorReady } = useBackendActor();
  return useQuery({
    queryKey: ["bills", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBills(filter);
    },
    enabled: actorReady,
  });
}

export function useBill(id: BillId) {
  const { actor, actorReady } = useBackendActor();
  return useQuery({
    queryKey: ["bill", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBill(id);
    },
    enabled: actorReady && id > 0n,
  });
}

export function usePayments(filter: PaymentFilter = {}) {
  const { actor, actorReady } = useBackendActor();
  return useQuery({
    queryKey: ["payments", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPayments(filter);
    },
    enabled: actorReady,
  });
}

export function useReceipts(filter: ReceiptFilter = {}) {
  const { actor, actorReady } = useBackendActor();
  return useQuery({
    queryKey: ["receipts", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReceipts(filter);
    },
    enabled: actorReady,
  });
}

export function useNotifications() {
  const { actor, actorReady } = useBackendActor();
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotifications();
    },
    enabled: actorReady,
    refetchInterval: 30000,
  });
}

export function useDashboardStats() {
  const { actor, actorReady } = useBackendActor();
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStats();
    },
    enabled: actorReady,
    refetchInterval: 60000,
  });
}

// --- Mutations ---

export function useAddStudent() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: StudentInput) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.addStudent(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students"] }),
  });
}

export function useUpdateStudent() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: { id: StudentId; input: StudentInput }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateStudent(id, input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["student", id.toString()] });
    },
  });
}

export function useDeleteStudent() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: StudentId) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.deleteStudent(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students"] }),
  });
}

export function useAddClass() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: ClassInput) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.addClass(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["classes"] }),
  });
}

export function useUpdateClass() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: ClassId; input: ClassInput }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateClass(id, input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["classes"] }),
  });
}

export function useDeleteClass() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: ClassId) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.deleteClass(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["classes"] }),
  });
}

export function useCreateFeeStructure() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: FeeStructureInput) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.createFeeStructure(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["feeStructures"] }),
  });
}

export function useUpdateFeeStructure() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: { id: FeeStructureId; input: FeeStructureInput }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateFeeStructure(id, input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["feeStructures"] }),
  });
}

export function useDeleteFeeStructure() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: FeeStructureId) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.deleteFeeStructure(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["feeStructures"] }),
  });
}

export function useGenerateBills() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      classId,
      academicYear,
      month,
    }: {
      classId: ClassId;
      academicYear: string;
      month: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.generateBills(classId, academicYear, month);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bills"] }),
  });
}

export function useRecordPayment() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: PaymentInput) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.recordPayment(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["bills"] });
      queryClient.invalidateQueries({ queryKey: ["receipts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useMarkNotificationRead() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: NotificationId) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.markNotificationRead(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });
}

export function useUpdateBillStatus() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      billId,
      status,
    }: { billId: BillId; status: BillStatus }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateBillStatus(billId, status);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bills"] }),
  });
}
