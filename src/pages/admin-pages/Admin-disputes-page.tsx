import { getAllDisputes } from "@/api-functions/dispute-functions";
import DisputeCard from "@/components/dispute-card";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Search } from "lucide-react";
import { useState } from "react";

const AdminDisputesPage = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const { data, isError, isLoading } = useQuery({
        queryFn: getAllDisputes,
        queryKey: ["get-all-disputes"],
        refetchInterval: 30 * 1000, // Refetch every 30 seconds
    });

    // Filter disputes based on search query
    const filteredDisputes = data?.filter((dispute) => {
        const query = searchQuery.toLowerCase();
        return (
            dispute.project.title.toLowerCase().includes(query) ||
            dispute.milestone.title.toLowerCase().includes(query) ||
            dispute.freelancer.username.toLowerCase().includes(query) ||
            dispute.client.username.toLowerCase().includes(query) ||
            dispute.dispute_description.toLowerCase().includes(query)
        );
    });

    return (
        <div>
            <h1 className="text-2xl font-semibold h-[60px] border-b flex justify-center items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                Disputes Management
            </h1>

            {isLoading && (
                <div className="h-[calc(100vh-70px)] flex justify-center items-center w-full">
                    <Spinner className="size-8 text-(--my-blue)" />
                </div>
            )}

            {isError && (
                <div className="h-[calc(100vh-70px)] flex justify-center items-center w-full">
                    <p className="text-red-600">Error loading disputes. Please try again.</p>
                </div>
            )}

            {data && (
                <div className="max-w-7xl mx-auto py-8 px-4 pb-20">
                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-red-600 font-medium">
                                        Total Disputes
                                    </p>
                                    <p className="text-3xl font-bold text-red-700 mt-1">
                                        {data.length}
                                    </p>
                                </div>
                                <AlertTriangle className="h-12 w-12 text-red-400" />
                            </div>
                        </div>

                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-orange-600 font-medium">
                                        Active Today
                                    </p>
                                    <p className="text-3xl font-bold text-orange-700 mt-1">
                                        {
                                            data.filter((d) => {
                                                const today = new Date();
                                                const disputeDate = new Date(d.created_at);
                                                return (
                                                    disputeDate.toDateString() ===
                                                    today.toDateString()
                                                );
                                            }).length
                                        }
                                    </p>
                                </div>
                                <AlertTriangle className="h-12 w-12 text-orange-400" />
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-yellow-600 font-medium">
                                        This Week
                                    </p>
                                    <p className="text-3xl font-bold text-yellow-700 mt-1">
                                        {
                                            data.filter((d) => {
                                                const weekAgo = new Date();
                                                weekAgo.setDate(weekAgo.getDate() - 7);
                                                const disputeDate = new Date(d.created_at);
                                                return disputeDate >= weekAgo;
                                            }).length
                                        }
                                    </p>
                                </div>
                                <AlertTriangle className="h-12 w-12 text-yellow-400" />
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search by project, milestone, freelancer, client, or description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* Disputes List */}
                    {data.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                No Disputes Found
                            </h3>
                            <p className="text-gray-500">
                                Great news! There are currently no active disputes.
                            </p>
                        </div>
                    ) : filteredDisputes && filteredDisputes.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                No Results Found
                            </h3>
                            <p className="text-gray-500">
                                Try adjusting your search query.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredDisputes?.map((dispute) => (
                                <DisputeCard key={dispute.id} dispute={dispute} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDisputesPage;
