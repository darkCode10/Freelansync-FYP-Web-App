import type { DisputeFromBackendType } from "@/Types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Calendar, DollarSign, FileText, AlertTriangle } from "lucide-react";

type PropsType = {
    dispute: DisputeFromBackendType;
};

const DisputeCard = ({ dispute }: PropsType) => {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <Card className="w-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            {dispute.project.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                            Dispute ID: {dispute.id.slice(0, 8)}...
                        </CardDescription>
                    </div>
                    <span className="ml-2 px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                        DISPUTED
                    </span>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Project & Milestone Info */}
                <div className="space-y-2">
                    <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">Milestone</p>
                            <p className="text-sm text-gray-600">{dispute.milestone.title}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">Amount</p>
                            <p className="text-sm text-gray-600">
                                Rs {dispute.milestone.amount.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">Created</p>
                            <p className="text-sm text-gray-600">
                                {new Date(dispute.created_at).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Dispute Description */}
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <p className="text-sm font-semibold text-red-900 mb-1">
                        Dispute Description:
                    </p>
                    <p className="text-sm text-red-800">{dispute.dispute_description}</p>
                </div>

                {/* Freelancer & Client Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t">
                    <div>
                        <p className="text-xs text-gray-500 mb-2 font-semibold">
                            FREELANCER (Raised Dispute)
                        </p>
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={dispute.freelancer.profile_pic} />
                                <AvatarFallback className="bg-blue-500 text-white text-xs">
                                    {getInitials(dispute.freelancer.username)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium">
                                    {dispute.freelancer.username}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {dispute.freelancer.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 mb-2 font-semibold">CLIENT</p>
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={dispute.client.profile_pic} />
                                <AvatarFallback className="bg-green-500 text-white text-xs">
                                    {getInitials(dispute.client.username)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium">{dispute.client.username}</p>
                                <p className="text-xs text-gray-500">{dispute.client.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons - Placeholder for future actions */}
                <div className="flex gap-2 pt-2">
                    <button className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors">
                        View Details
                    </button>
                    <button className="flex-1 py-2 px-3 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition-colors">
                        Resolve
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};

export default DisputeCard;
