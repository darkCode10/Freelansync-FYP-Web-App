import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "./ui/button";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMilestoneStatus } from "@/api-functions/milestone-functions";
import { toast } from "sonner";

const UpadateMilestoneStatusDialog = ({
    milestoneId,
    projectId,
    freelancerId,
    milestoneAmount,
    requiredStatus,
}: {
    milestoneId: string;
    projectId: string;
    freelancerId: string;
    milestoneAmount: number;
    requiredStatus: "COMPLETED" | "IN_PROGRESS";
}) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const { mutate, isPending } = useMutation({
        mutationFn: updateMilestoneStatus,
        onSuccess() {
            toast.success("Status updated successfully");
            queryClient.invalidateQueries({
                queryKey: ["get-milestone-details-by-id", milestoneId],
            });
            queryClient.invalidateQueries({
                queryKey: ["get-recent-milestones-for-user"],
            });
            queryClient.invalidateQueries({
                queryKey: ["get-all-milestones-for-project", projectId],
            });

            setOpen(false);
        },
        onError(error) {
            toast.error(`Failed to update status: ${error.message}`);
        },
    });

    function handleClick() {
        if (requiredStatus === "IN_PROGRESS") {
            mutate({
                freelancerId: freelancerId,
                milestoneAmount: milestoneAmount,
                milestoneId: milestoneId,
                requiredChoice: "IN_PROGRESS",
            });
        } else {
            mutate({
                freelancerId: freelancerId,
                milestoneAmount: milestoneAmount,
                milestoneId: milestoneId,
                requiredChoice: "COMPLETED",
            });
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild className="mt-5">
                <Button variant="custom" className="w-fit">
                    {requiredStatus === "IN_PROGRESS"
                        ? "Activate Milestone"
                        : "Mark Completed"}
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="p-4 sm:p-6">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {requiredStatus === "IN_PROGRESS"
                            ? "Do you really want to active this milestone?"
                            : "Do you really want to mark this milestone as completed?"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {requiredStatus === "IN_PROGRESS"
                            ? "Activating this milestone will unlock the milestone and enable the freelancer to submit work."
                            : "Marking milestone as completed will transfer allocated funds to freelancer and milestone will be freezed."}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                    <Button
                        onClick={handleClick}
                        disabled={isPending}
                        variant="custom"
                        type="submit"
                        className="cursor-pointer"
                    >
                        {isPending && <Spinner />}{" "}
                        {requiredStatus === "IN_PROGRESS" ? "Acivate" : "Mark Completed"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default UpadateMilestoneStatusDialog;
