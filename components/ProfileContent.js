import { useEffect, useState } from "react";
import Card from "./Card";
import FriendInfo from "./FriendInfo";
import PostCard from "./PostCard";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function ProfileContent({activeTab, userId}) {
    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState(null);
    
    const supabase = useSupabaseClient();
    useEffect(() => {
        if (!userId) {
            return;
        }
        if (activeTab === 'posts'){
            loadPosts().then(() => {});
        }
    }, []);

    async function loadPosts() {
        const posts = await userPosts(userId);
        const profile = await userProfile(userId);
        setPosts(posts);
        setProfile(profile);
    }

    async function userPosts(userId) {
        const {data} = await supabase.from('posts').select('id, content, created_at, author, photos').is('parent', null).eq('author', userId)
        return data;
    }

    async function userProfile(userId) {
        const {data} = await supabase.from('profiles').select().eq('id', userId);
        return data[0];
    }
    return (
        <div>
            {activeTab === 'posts' && (
                <div>
                    {posts?.length > 0 && posts.map(post => (
                        <PostCard key={post.created_at} {...post} profiles={profile}/>
                    ))}
                </div>
            )}
            {activeTab === 'about' && (
                <div>
                    <Card>
                        <h2 className="text-3xl mb-2">About me</h2>
                    </Card>
                </div>
            )} 
            {activeTab === 'friends' && (
                <div>
                    <Card>
                        <h2 className="text-3xl mb-2">Friends</h2>
                        <div className="">
                            <div className="border-b border-b-gray-100 p-4 -mx-4">
                                <FriendInfo/>
                            </div>
                            <div className="border-b border-b-gray-100 p-4 -mx-4">
                                <FriendInfo/>
                            </div>
                            <div className="border-b border-b-gray-100 p-4 -mx-4">
                                <FriendInfo/>
                            </div>
                            <div className="border-b border-b-gray-100 p-4 -mx-4">
                                <FriendInfo/>
                            </div>
                            <div className="border-b border-b-gray-100 p-4 -mx-4">
                                <FriendInfo/>
                            </div>
                            <div className="border-b border-b-gray-100 p-4 -mx-4">
                                <FriendInfo/>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
            {activeTab === 'photos' && (
                <div>
                    <Card>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="rounded-md overflow-hidden flex items-center h-48 shadows-md">
                                <img src="https://images.unsplash.com/photo-1663292039460-188fe02b5968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFza2V0YmFsbCUyMHNuZWFrZXJzfGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=60" alt="/"/>
                            </div>
                            <div className="rounded-md overflow-hidden flex items-center h-48 shadows-md">
                                <img src="https://images.unsplash.com/photo-1613839817782-6c41fef752ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFza2V0YmFsbCUyMHNuZWFrZXJzfGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=60" alt="/"/>
                            </div>
                            <div className="rounded-md overflow-hidden flex items-center h-48 shadows-md">
                                <img src="https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhc2tldGJhbGwlMjBzbmVha2Vyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60" alt="/"/>
                            </div> 
                            <div className="rounded-md overflow-hidden flex items-center h-48 shadows-md">
                                <img src="https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhc2tldGJhbGwlMjBzbmVha2Vyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60" alt="/"/>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}