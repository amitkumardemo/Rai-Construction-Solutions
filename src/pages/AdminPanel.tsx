  import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs, doc, updateDoc, deleteDoc, orderBy, query } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, LogOut, Youtube, Edit, Trash2 } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  content?: string;
  type: 'manual' | 'youtube';
  youtubeUrl?: string;
  createdAt: any;
}

interface BlogPostWithId extends BlogPost {
  id: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  benefits: string;
  createdAt: any;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  location: string;
  year: string;
  client: string;
  services: string[];
  details: string;
  createdAt: any;
}

interface Testimonial {
  id: string;
  name: string;
  message: string;
  position: string;
  company: string;
  image: string;
  createdAt: any;
}

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // State variables
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("blogs");

  // Services state
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);

  // Manual post state
  const [manualTitle, setManualTitle] = useState("");
  const [manualDescription, setManualDescription] = useState("");
  const [manualContent, setManualContent] = useState("");
  const [manualThumbnail, setManualThumbnail] = useState<File | null>(null);

  // YouTube post state
  const [youtubeTitle, setYoutubeTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeData, setYoutubeData] = useState<{
    title: string;
    videoId: string;
    thumbnail: string;
  } | null>(null);
  const [youtubeContent, setYoutubeContent] = useState("");
  const [youtubeLoading, setYoutubeLoading] = useState(false);

  // Posts management state
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Edit form state
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editThumbnail, setEditThumbnail] = useState<File | null>(null);

  // Service form state
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceImage, setServiceImage] = useState<File | null>(null);
  const [serviceFeatures, setServiceFeatures] = useState("");
  const [serviceBenefits, setServiceBenefits] = useState("");

  // Edit service state
  const [editServiceTitle, setEditServiceTitle] = useState("");
  const [editServiceDescription, setEditServiceDescription] = useState("");
  const [editServiceFeatures, setEditServiceFeatures] = useState("");
  const [editServiceBenefits, setEditServiceBenefits] = useState("");
  const [editServiceImage, setEditServiceImage] = useState<File | null>(null);

  // Project form state
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [projectCategory, setProjectCategory] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [projectYear, setProjectYear] = useState("");
  const [projectClient, setProjectClient] = useState("");
  const [projectServices, setProjectServices] = useState("");
  const [projectDetails, setProjectDetails] = useState("");

  // Edit project state
  const [editProjectTitle, setEditProjectTitle] = useState("");
  const [editProjectDescription, setEditProjectDescription] = useState("");
  const [editProjectCategory, setEditProjectCategory] = useState("");
  const [editProjectLocation, setEditProjectLocation] = useState("");
  const [editProjectYear, setEditProjectYear] = useState("");
  const [editProjectClient, setEditProjectClient] = useState("");
  const [editProjectServices, setEditProjectServices] = useState("");
  const [editProjectDetails, setEditProjectDetails] = useState("");
  const [editProjectImage, setEditProjectImage] = useState<File | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/admin/login");
    }
  }, [user, navigate]);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setPostsLoading(true);
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];
        setPosts(postsData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch posts");
      } finally {
        setPostsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      setServicesLoading(true);
      try {
        const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const servicesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Service[];
        setServices(servicesData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch services");
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      setProjectsLoading(true);
      try {
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Project[];
        setProjects(projectsData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch projects");
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const fetchYouTubeData = async () => {
    if (!youtubeUrl) return;

    setYoutubeLoading(true);
    try {
      // Extract video ID from URL
      const videoId = youtubeUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
      if (!videoId) {
        throw new Error("Invalid YouTube URL");
      }

      // Use YouTube Data API v3 to get full video details
      const apiKey = 'AIzaSyDnG0hwHatEUDrRbrSnNJoNG9lYkHiCfY0';
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`);
      if (!response.ok) {
        throw new Error("Failed to fetch YouTube data");
      }

      const data = await response.json();
      if (!data.items || data.items.length === 0) {
        throw new Error("Video not found");
      }

      const video = data.items[0].snippet;
      setYoutubeData({
        title: video.title,
        videoId: videoId,
        thumbnail: video.thumbnails.medium.url,
      });
    } catch (err: any) {
      setError(err.message || "Failed to fetch YouTube data");
    } finally {
      setYoutubeLoading(false);
    }
  };

  const uploadThumbnail = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `blog-thumbnails/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const uploadImage = async (file: File, folder: string): Promise<string> => {
    const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const createBlogPost = async (postData: Omit<BlogPost, 'createdAt' | 'id'>) => {
    const docRef = await addDoc(collection(db, "blogs"), {
      ...postData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let thumbnailUrl = "https://via.placeholder.com/400x250/6366f1/ffffff?text=Blog+Post"; // Default thumbnail

      if (manualThumbnail) {
        thumbnailUrl = await uploadThumbnail(manualThumbnail);
      }

      await createBlogPost({
        title: manualTitle,
        description: manualDescription,
        content: manualContent,
        thumbnail: thumbnailUrl,
        type: 'manual',
      });

      setSuccess("Blog post created successfully!");
      // Reset form
      setManualTitle("");
      setManualDescription("");
      setManualContent("");
      setManualThumbnail(null);

      // Refresh posts
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      setPosts(postsData);

      // Redirect to blog after a short delay
      setTimeout(() => {
        navigate("/blog");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to create blog post");
    } finally {
      setLoading(false);
    }
  };

  const handleYouTubeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeData) {
      setError("Please fetch YouTube data first");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await createBlogPost({
        title: youtubeTitle,
        description: `YouTube Video: ${youtubeData.title}`,
        content: youtubeContent,
        thumbnail: "https://via.placeholder.com/400x250/6366f1/ffffff?text=Blog+Post", // Default thumbnail
        type: 'youtube',
        youtubeUrl,
      });

      setSuccess("YouTube blog post created successfully!");
      // Reset form
      setYoutubeTitle("");
      setYoutubeUrl("");
      setYoutubeData(null);
      setYoutubeContent("");

      // Refresh posts
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      setPosts(postsData);

      // Redirect to blog after a short delay
      setTimeout(() => {
        navigate("/blog");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to create blog post");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await deleteDoc(doc(db, "blogs", postId));
      setPosts(posts.filter(post => post.id !== postId));
      setSuccess("Post deleted successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to delete post");
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setEditTitle(post.title);
    setEditDescription(post.description);
    setEditContent(post.content || "");
    setEditThumbnail(null);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let thumbnailUrl = editingPost.thumbnail;

      if (editThumbnail) {
        thumbnailUrl = await uploadThumbnail(editThumbnail);
      }

      await updateDoc(doc(db, "blogs", editingPost.id), {
        title: editTitle,
        description: editDescription,
        content: editContent,
        thumbnail: thumbnailUrl,
      });

      setSuccess("Blog post updated successfully!");
      setEditDialogOpen(false);
      setEditingPost(null);

      // Refresh posts
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      setPosts(postsData);
    } catch (err: any) {
      setError(err.message || "Failed to update blog post");
    } finally {
      setLoading(false);
    }
  };

  // Service handlers
  const createService = async (serviceData: Omit<Service, 'createdAt' | 'id'>) => {
    const docRef = await addDoc(collection(db, "services"), {
      ...serviceData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let imageUrl = "https://via.placeholder.com/400x250/6366f1/ffffff?text=Service"; // Default image

      if (serviceImage) {
        imageUrl = await uploadImage(serviceImage, "service-images");
      }

      await createService({
        title: serviceTitle,
        description: serviceDescription,
        image: imageUrl,
        features: serviceFeatures.split('\n').filter(f => f.trim()),
        benefits: serviceBenefits,
      });

      setSuccess("Service created successfully!");
      // Reset form
      setServiceTitle("");
      setServiceDescription("");
      setServiceImage(null);
      setServiceFeatures("");
      setServiceBenefits("");

      // Refresh services
      const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const servicesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Service[];
      setServices(servicesData);
    } catch (err: any) {
      setError(err.message || "Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setEditServiceTitle(service.title);
    setEditServiceDescription(service.description);
    setEditServiceFeatures(service.features.join('\n'));
    setEditServiceBenefits(service.benefits);
    setEditServiceImage(null);
    setServiceDialogOpen(true);
  };

  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let imageUrl = editingService.image;

      if (editServiceImage) {
        imageUrl = await uploadImage(editServiceImage, "service-images");
      }

      await updateDoc(doc(db, "services", editingService.id), {
        title: editServiceTitle,
        description: editServiceDescription,
        features: editServiceFeatures.split('\n').filter(f => f.trim()),
        benefits: editServiceBenefits,
        image: imageUrl,
      });

      setSuccess("Service updated successfully!");
      setServiceDialogOpen(false);
      setEditingService(null);

      // Refresh services
      const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const servicesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Service[];
      setServices(servicesData);
    } catch (err: any) {
      setError(err.message || "Failed to update service");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      await deleteDoc(doc(db, "services", serviceId));
      setServices(services.filter(service => service.id !== serviceId));
      setSuccess("Service deleted successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to delete service");
    }
  };

  // Project handlers
  const createProject = async (projectData: Omit<Project, 'createdAt' | 'id'>) => {
    const docRef = await addDoc(collection(db, "projects"), {
      ...projectData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let imageUrl = "https://via.placeholder.com/400x250/6366f1/ffffff?text=Project"; // Default image

      if (projectImage) {
        imageUrl = await uploadImage(projectImage, "project-images");
      }

      await createProject({
        title: projectTitle,
        description: projectDescription,
        image: imageUrl,
        category: projectCategory,
        location: projectLocation,
        year: projectYear,
        client: projectClient,
        services: projectServices.split('\n').filter(s => s.trim()),
        details: projectDetails,
      });

      setSuccess("Project created successfully!");
      // Reset form
      setProjectTitle("");
      setProjectDescription("");
      setProjectImage(null);
      setProjectCategory("");
      setProjectLocation("");
      setProjectYear("");
      setProjectClient("");
      setProjectServices("");
      setProjectDetails("");

      // Refresh projects
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectsData);
    } catch (err: any) {
      setError(err.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setEditProjectTitle(project.title);
    setEditProjectDescription(project.description);
    setEditProjectCategory(project.category);
    setEditProjectLocation(project.location);
    setEditProjectYear(project.year);
    setEditProjectClient(project.client);
    setEditProjectServices(project.services.join('\n'));
    setEditProjectDetails(project.details);
    setEditProjectImage(null);
    setProjectDialogOpen(true);
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let imageUrl = editingProject.image;

      if (editProjectImage) {
        imageUrl = await uploadImage(editProjectImage, "project-images");
      }

      await updateDoc(doc(db, "projects", editingProject.id), {
        title: editProjectTitle,
        description: editProjectDescription,
        category: editProjectCategory,
        location: editProjectLocation,
        year: editProjectYear,
        client: editProjectClient,
        services: editProjectServices.split('\n').filter(s => s.trim()),
        details: editProjectDetails,
        image: imageUrl,
      });

      setSuccess("Project updated successfully!");
      setProjectDialogOpen(false);
      setEditingProject(null);

      // Refresh projects
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectsData);
    } catch (err: any) {
      setError(err.message || "Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteDoc(doc(db, "projects", projectId));
      setProjects(projects.filter(project => project.id !== projectId));
      setSuccess("Project deleted successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to delete project");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };



  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex flex-col lg:flex-row pt-16">
        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-slate-900 text-white p-6 border-r lg:border-r lg:border-b-0 border-b min-h-screen">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold">MS</span>
            </div>
            <h2 className="text-xl font-bold mb-2">Welcome back</h2>
            <p className="text-slate-300 text-sm">Mrinal Sir</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-slate-800 p-4 rounded-lg">
              <h3 className="font-semibold text-sm text-slate-300 mb-2">Dashboard</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{posts.length}</div>
                  <div className="text-xs text-slate-400">Total Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {posts.filter(p => p.type === 'youtube').length}
                  </div>
                  <div className="text-xs text-slate-400">YouTube Posts</div>
                </div>
              </div>
            </div>
          </div>

          <Button onClick={handleLogout} variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="blogs" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="blogs">
              <Tabs defaultValue="create" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="create">Create Post</TabsTrigger>
                  <TabsTrigger value="manage">Manage Posts</TabsTrigger>
                </TabsList>

                <TabsContent value="create">
                  <Tabs defaultValue="manual" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="manual">Manual Blog Post</TabsTrigger>
                      <TabsTrigger value="youtube">YouTube Blog Post</TabsTrigger>
                    </TabsList>

                    <TabsContent value="manual">
                      <Card>
                        <CardHeader>
                          <CardTitle>Create Manual Blog Post</CardTitle>
                          <CardDescription>
                            Add a new blog post with custom content and thumbnail
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <form onSubmit={handleManualSubmit} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="manual-title">Title</Label>
                              <Input
                                id="manual-title"
                                value={manualTitle}
                                onChange={(e) => setManualTitle(e.target.value)}
                                required
                                placeholder="Enter blog post title"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="manual-description">Description</Label>
                              <Textarea
                                id="manual-description"
                                value={manualDescription}
                                onChange={(e) => setManualDescription(e.target.value)}
                                required
                                placeholder="Enter blog post description"
                                rows={3}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="manual-content">Content</Label>
                              <Textarea
                                id="manual-content"
                                value={manualContent}
                                onChange={(e) => setManualContent(e.target.value)}
                                required
                                placeholder="Enter full blog post content"
                                rows={10}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="manual-thumbnail">Thumbnail (Optional)</Label>
                              <Input
                                id="manual-thumbnail"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setManualThumbnail(e.target.files?.[0] || null)}
                              />
                              <p className="text-sm text-muted-foreground">
                                Upload a custom thumbnail image. If not provided, a default thumbnail will be used.
                              </p>
                            </div>

                            <Button type="submit" disabled={loading} className="w-full">
                              {loading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Creating Post...
                                </>
                              ) : (
                                "Create Blog Post"
                              )}
                            </Button>
                          </form>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="youtube">
                      <Card>
                        <CardHeader>
                          <CardTitle>Create YouTube Blog Post</CardTitle>
                          <CardDescription>
                            Create a blog post from a YouTube video link
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <form onSubmit={handleYouTubeSubmit} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="youtube-title">Title</Label>
                              <Input
                                id="youtube-title"
                                value={youtubeTitle}
                                onChange={(e) => setYoutubeTitle(e.target.value)}
                                required
                                placeholder="Enter blog post title"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="youtube-url">YouTube URL</Label>
                              <div className="flex space-x-2">
                                <Input
                                  id="youtube-url"
                                  value={youtubeUrl}
                                  onChange={(e) => setYoutubeUrl(e.target.value)}
                                  required
                                  placeholder="https://www.youtube.com/watch?v=..."
                                  className="flex-1"
                                />
                                <Button
                                  type="button"
                                  onClick={fetchYouTubeData}
                                  disabled={youtubeLoading}
                                  variant="outline"
                                >
                                  {youtubeLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Youtube className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="youtube-content">Content</Label>
                              <Textarea
                                id="youtube-content"
                                value={youtubeContent}
                                onChange={(e) => setYoutubeContent(e.target.value)}
                                required
                                placeholder="Enter full blog post content"
                                rows={10}
                              />
                            </div>

                            {youtubeData && (
                              <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                                <div className="flex space-x-4">
                                  <img
                                    src={youtubeData.thumbnail}
                                    alt={youtubeData.title}
                                    className="w-32 h-24 object-cover rounded"
                                  />
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">
                                      {youtubeData.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                      YouTube Video
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            <Button type="submit" disabled={loading || !youtubeData} className="w-full">
                              {loading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Creating Post...
                                </>
                              ) : (
                                "Create YouTube Blog Post"
                              )}
                            </Button>
                          </form>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </TabsContent>

                <TabsContent value="manage">
                  <Card>
                    <CardHeader>
                      <CardTitle>Manage Blog Posts</CardTitle>
                      <CardDescription>
                        View, edit, and delete your blog posts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {postsLoading ? (
                        <div className="flex justify-center py-8">
                          <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                      ) : posts.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">No blog posts found.</p>
                      ) : (
                        <div className="space-y-4">
                          {posts.map((post) => (
                            <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center space-x-4">
                                <img
                                  src={post.thumbnail}
                                  alt={post.title}
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                  <h3 className="font-semibold">{post.title}</h3>
                                  <p className="text-sm text-muted-foreground">{post.description}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {post.type === 'youtube' ? 'YouTube' : 'Manual'} • {post.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown date'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Dialog open={editDialogOpen && editingPost?.id === post.id} onOpenChange={setEditDialogOpen}>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleEditPost(post)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>Edit Blog Post</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleEditSubmit} className="space-y-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-title">Title</Label>
                                        <Input
                                          id="edit-title"
                                          value={editTitle}
                                          onChange={(e) => setEditTitle(e.target.value)}
                                          required
                                          placeholder="Enter blog post title"
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <Label htmlFor="edit-description">Description</Label>
                                        <Textarea
                                          id="edit-description"
                                          value={editDescription}
                                          onChange={(e) => setEditDescription(e.target.value)}
                                          required
                                          placeholder="Enter blog post description"
                                          rows={3}
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <Label htmlFor="edit-content">Content</Label>
                                        <Textarea
                                          id="edit-content"
                                          value={editContent}
                                          onChange={(e) => setEditContent(e.target.value)}
                                          required
                                          placeholder="Enter full blog post content"
                                          rows={10}
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <Label htmlFor="edit-thumbnail">Thumbnail (Optional)</Label>
                                        <Input
                                          id="edit-thumbnail"
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => setEditThumbnail(e.target.files?.[0] || null)}
                                        />
                                        <p className="text-sm text-muted-foreground">
                                          Upload a new thumbnail image. If not provided, the current thumbnail will be kept.
                                        </p>
                                      </div>

                                      <div className="flex space-x-2">
                                        <Button type="submit" disabled={loading} className="flex-1">
                                          {loading ? (
                                            <>
                                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                              Updating...
                                            </>
                                          ) : (
                                            "Update Post"
                                          )}
                                        </Button>
                                        <Button
                                          type="button"
                                          variant="outline"
                                          onClick={() => setEditDialogOpen(false)}
                                        >
                                          Cancel
                                        </Button>
                                      </div>
                                    </form>
                                  </DialogContent>
                                </Dialog>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDeletePost(post.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="services">
              <Tabs defaultValue="create-service" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="create-service">Create Service</TabsTrigger>
                  <TabsTrigger value="manage-services">Manage Services</TabsTrigger>
                </TabsList>

                <TabsContent value="create-service">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create Service</CardTitle>
                      <CardDescription>
                        Add a new service with details and image
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleCreateService} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="service-title">Title</Label>
                          <Input
                            id="service-title"
                            value={serviceTitle}
                            onChange={(e) => setServiceTitle(e.target.value)}
                            required
                            placeholder="Enter service title"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="service-description">Description</Label>
                          <Textarea
                            id="service-description"
                            value={serviceDescription}
                            onChange={(e) => setServiceDescription(e.target.value)}
                            required
                            placeholder="Enter service description"
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="service-features">Features (one per line)</Label>
                          <Textarea
                            id="service-features"
                            value={serviceFeatures}
                            onChange={(e) => setServiceFeatures(e.target.value)}
                            required
                            placeholder="Enter service features, one per line"
                            rows={4}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="service-benefits">Benefits</Label>
                          <Textarea
                            id="service-benefits"
                            value={serviceBenefits}
                            onChange={(e) => setServiceBenefits(e.target.value)}
                            required
                            placeholder="Enter service benefits"
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="service-image">Image (Optional)</Label>
                          <Input
                            id="service-image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setServiceImage(e.target.files?.[0] || null)}
                          />
                          <p className="text-sm text-muted-foreground">
                            Upload a custom image. If not provided, a default image will be used.
                          </p>
                        </div>

                        <Button type="submit" disabled={loading} className="w-full">
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating Service...
                            </>
                          ) : (
                            "Create Service"
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="manage-services">
                  <Card>
                    <CardHeader>
                      <CardTitle>Manage Services</CardTitle>
                      <CardDescription>
                        View, edit, and delete your services
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {servicesLoading ? (
                        <div className="flex justify-center py-8">
                          <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                      ) : services.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">No services found.</p>
                      ) : (
                        <div className="space-y-4">
                          {services.map((service) => (
                            <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center space-x-4">
                                <img
                                  src={service.image}
                                  alt={service.title}
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                  <h3 className="font-semibold">{service.title}</h3>
                                  <p className="text-sm text-muted-foreground">{service.description}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {service.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown date'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Dialog open={serviceDialogOpen && editingService?.id === service.id} onOpenChange={setServiceDialogOpen}>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleEditService(service)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>Edit Service</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleUpdateService} className="space-y-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-service-title">Title</Label>
                                        <Input
                                          id="edit-service-title"
                                          value={editServiceTitle}
                                          onChange={(e) => setEditServiceTitle(e.target.value)}
                                          required
                                          placeholder="Enter service title"
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <Label htmlFor="edit-service-description">Description</Label>
                                        <Textarea
                                          id="edit-service-description"
                                          value={editServiceDescription}
                                          onChange={(e) => setEditServiceDescription(e.target.value)}
                                          required
                                          placeholder="Enter service description"
                                          rows={3}
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <Label htmlFor="edit-service-features">Features (one per line)</Label>
                                        <Textarea
                                          id="edit-service-features"
                                          value={editServiceFeatures}
                                          onChange={(e) => setEditServiceFeatures(e.target.value)}
                                          required
                                          placeholder="Enter service features, one per line"
                                          rows={4}
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <Label htmlFor="edit-service-benefits">Benefits</Label>
                                        <Textarea
                                          id="edit-service-benefits"
                                          value={editServiceBenefits}
                                          onChange={(e) => setEditServiceBenefits(e.target.value)}
                                          required
                                          placeholder="Enter service benefits"
                                          rows={3}
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <Label htmlFor="edit-service-image">Image (Optional)</Label>
                                        <Input
                                          id="edit-service-image"
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => setEditServiceImage(e.target.files?.[0] || null)}
                                        />
                                        <p className="text-sm text-muted-foreground">
                                          Upload a new image. If not provided, the current image will be kept.
                                        </p>
                                      </div>

                                      <div className="flex space-x-2">
                                        <Button type="submit" disabled={loading} className="flex-1">
                                          {loading ? (
                                            <>
                                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                              Updating...
                                            </>
                                          ) : (
                                            "Update Service"
                                          )}
                                        </Button>
                                        <Button
                                          type="button"
                                          variant="outline"
                                          onClick={() => setServiceDialogOpen(false)}
                                        >
                                          Cancel
                                        </Button>
                                      </div>
                                    </form>
                                  </DialogContent>
                                </Dialog>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDeleteService(service.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="projects">
              <Tabs defaultValue="create-project" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="create-project">Create Project</TabsTrigger>
                  <TabsTrigger value="manage-projects">Manage Projects</TabsTrigger>
                </TabsList>

                <TabsContent value="create-project">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create Project</CardTitle>
                      <CardDescription>
                        Add a new project with details and image
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleCreateProject} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="project-title">Title</Label>
                          <Input
                            id="project-title"
                            value={projectTitle}
                            onChange={(e) => setProjectTitle(e.target.value)}
                            required
                            placeholder="Enter project title"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="project-description">Description</Label>
                          <Textarea
                            id="project-description"
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            required
                            placeholder="Enter project description"
                            rows={3}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="project-category">Category</Label>
                            <Input
                              id="project-category"
                              value={projectCategory}
                              onChange={(e) => setProjectCategory(e.target.value)}
                              required
                              placeholder="e.g., Residential"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="project-location">Location</Label>
                            <Input
                              id="project-location"
                              value={projectLocation}
                              onChange={(e) => setProjectLocation(e.target.value)}
                              required
                              placeholder="e.g., Mumbai"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="project-year">Year</Label>
                            <Input
                              id="project-year"
                              value={projectYear}
                              onChange={(e) => setProjectYear(e.target.value)}
                              required
                              placeholder="e.g., 2023"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="project-client">Client</Label>
                            <Input
                              id="project-client"
                              value={projectClient}
                              onChange={(e) => setProjectClient(e.target.value)}
                              required
                              placeholder="Client name"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="project-services">Services</Label>
                            <Input
                              id="project-services"
                              value={projectServices}
                              onChange={(e) => setProjectServices(e.target.value)}
                              required
                              placeholder="Services provided"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="project-details">Project Details</Label>
                          <Textarea
                            id="project-details"
                            value={projectDetails}
                            onChange={(e) => setProjectDetails(e.target.value)}
                            required
                            placeholder="Detailed project information"
                            rows={5}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="project-image">Image (Optional)</Label>
                          <Input
                            id="project-image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setProjectImage(e.target.files?.[0] || null)}
                          />
                          <p className="text-sm text-muted-foreground">
                            Upload a custom image. If not provided, a default image will be used.
                          </p>
                        </div>

                        <Button type="submit" disabled={loading} className="w-full">
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating Project...
                            </>
                          ) : (
                            "Create Project"
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="manage-projects">
                  <Card>
                    <CardHeader>
                      <CardTitle>Manage Projects</CardTitle>
                      <CardDescription>
                        View, edit, and delete your projects
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {projectsLoading ? (
                        <div className="flex justify-center py-8">
                          <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                      ) : projects.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">No projects found.</p>
                      ) : (
                        <div className="space-y-4">
                          {projects.map((project) => (
                            <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center space-x-4">
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                  <h3 className="font-semibold">{project.title}</h3>
                                  <p className="text-sm text-muted-foreground">{project.description}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {project.category} • {project.location} • {project.year}
                                  </p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Dialog open={projectDialogOpen && editingProject?.id === project.id} onOpenChange={setProjectDialogOpen}>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleEditProject(project)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>Edit Project</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleUpdateProject} className="space-y-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-project-title">Title</Label>
                                        <Input
                                          id="edit-project-title"
                                          value={editProjectTitle}
                                          onChange={(e) => setEditProjectTitle(e.target.value)}
                                          required
                                          placeholder="Enter project title"
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <Label htmlFor="edit-project-description">Description</Label>
                                        <Textarea
                                          id="edit-project-description"
                                          value={editProjectDescription}
                                          onChange={(e) => setEditProjectDescription(e.target.value)}
                                          required
                                          placeholder="Enter project description"
                                          rows={3}
                                        />
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-project-category">Category</Label>
                                          <Input
                                            id="edit-project-category"
                                            value={editProjectCategory}
                                            onChange={(e) => setEditProjectCategory(e.target.value)}
                                            required
                                            placeholder="e.g., Residential"
                                          />
                                        </div>

                                        <div className="space-y-2">
                                          <Label htmlFor="edit-project-location">Location</Label>
                                          <Input
                                            id="edit-project-location"
                                            value={editProjectLocation}
                                            onChange={(e) => setEditProjectLocation(e.target.value)}
                                            required
                                            placeholder="e.g., Mumbai"
                                          />
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-project-year">Year</Label>
                                          <Input
                                            id="edit-project-year"
                                            value={editProjectYear}
                                            onChange={(e) => setEditProjectYear(e.target.value)}
                                            required
                                            placeholder="e.g., 2023"
                                          />
                                        </div>

                                        <div className="space-y-2">
                                          <Label htmlFor="edit-project-client">Client</Label>
                                          <Input
                                            id="edit-project-client"
                                            value={editProjectClient}
                                            onChange={(e) => setEditProjectClient(e.target.value)}
                                            required
                                            placeholder="Client name"
                                          />
                                        </div>

                                        <div className="space-y-2">
                                          <Label htmlFor="edit-project-services">Services (one per line)</Label>
                                          <Textarea
                                            id="edit-project-services"
                                            value={editProjectServices}
                                            onChange={(e) => setEditProjectServices(e.target.value)}
                                            required
                                            placeholder="Services provided, one per line"
                                            rows={2}
                                          />
                                        </div>
                                      </div>

                                      <div className="space-y-2">
                                        <Label htmlFor="edit-project-details">Project Details</Label>
                                        <Textarea
                                          id="edit-project-details"
                                          value={editProjectDetails}
                                          onChange={(e) => setEditProjectDetails(e.target.value)}
                                          required
                                          placeholder="Detailed project information"
                                          rows={5}
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <Label htmlFor="edit-project-image">Image (Optional)</Label>
                                        <Input
                                          id="edit-project-image"
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => setEditProjectImage(e.target.files?.[0] || null)}
                                        />
                                        <p className="text-sm text-muted-foreground">
                                          Upload a new image. If not provided, the current image will be kept.
                                        </p>
                                      </div>

                                      <div className="flex space-x-2">
                                        <Button type="submit" disabled={loading} className="flex-1">
                                          {loading ? (
                                            <>
                                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                              Updating...
                                            </>
                                          ) : (
                                            "Update Project"
                                          )}
                                        </Button>
                                        <Button
                                          type="button"
                                          variant="outline"
                                          onClick={() => setProjectDialogOpen(false)}
                                        >
                                          Cancel
                                        </Button>
                                      </div>
                                    </form>
                                  </DialogContent>
                                </Dialog>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDeleteProject(project.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
