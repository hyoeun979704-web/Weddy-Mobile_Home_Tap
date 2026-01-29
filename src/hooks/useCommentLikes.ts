import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useCommentLikes = (postId: string) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch all comment likes for comments in this post
  const { data: commentLikesData = {} } = useQuery({
    queryKey: ["comment-likes", postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_comment_likes")
        .select("comment_id, user_id");
      
      if (error) throw error;

      // Group by comment_id for efficient lookup
      const likesMap: Record<string, { count: number; userLiked: boolean }> = {};
      
      data.forEach((like) => {
        if (!likesMap[like.comment_id]) {
          likesMap[like.comment_id] = { count: 0, userLiked: false };
        }
        likesMap[like.comment_id].count++;
        if (user && like.user_id === user.id) {
          likesMap[like.comment_id].userLiked = true;
        }
      });

      return likesMap;
    },
    enabled: !!postId,
  });

  // Toggle comment like mutation
  const toggleLikeMutation = useMutation({
    mutationFn: async (commentId: string) => {
      if (!user) {
        navigate("/auth");
        throw new Error("Not authenticated");
      }

      const isLiked = commentLikesData[commentId]?.userLiked || false;

      if (isLiked) {
        const { error } = await supabase
          .from("community_comment_likes")
          .delete()
          .eq("comment_id", commentId)
          .eq("user_id", user.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("community_comment_likes")
          .insert({ comment_id: commentId, user_id: user.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment-likes", postId] });
    },
    onError: (error) => {
      if (error.message !== "Not authenticated") {
        toast.error("좋아요 처리에 실패했습니다.");
      }
    },
  });

  const getCommentLikeInfo = (commentId: string) => {
    return commentLikesData[commentId] || { count: 0, userLiked: false };
  };

  return {
    getCommentLikeInfo,
    toggleLike: toggleLikeMutation.mutate,
    isToggling: toggleLikeMutation.isPending,
  };
};
