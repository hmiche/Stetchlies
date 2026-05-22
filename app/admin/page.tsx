'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  Plus, Edit, Trash2, Eye, LogOut, Settings, FileText, Upload, Lock, Unlock, 
  Search, Save, BookOpen, Sparkles, Bold, Italic, Heading2, Heading3, 
  List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Globe, FileEdit, 
  User, CheckCircle, AlertCircle, X, ChevronRight, RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { 
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell 
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter 
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { 
  verifyAdminPassword, isAdminAuthenticated, logoutAdmin, 
  getAdminPosts, saveAdminPost, deleteAdminPost, uploadImage 
} from './actions'

// Helper function to slugify text
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

// Simple client-side Markdown renderer for the preview pane
function renderSimpleMarkdown(text: string) {
  if (!text) return ''
  
  // Escape HTML tags to prevent XSS
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  
  // Headings
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-serif font-bold mt-4 mb-2 text-foreground">$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-serif font-bold mt-6 mb-3 text-foreground border-b pb-1">$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-serif font-bold mt-8 mb-4 text-foreground">$1</h1>')
  
  // Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  // Images
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="my-6 rounded-xl border border-border shadow-sm max-h-96 object-cover mx-auto" />')

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-primary underline hover:text-primary/80">$1</a>')
  
  // Blockquotes
  html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground bg-primary/5 py-2 pr-2">$1</blockquote>')
  
  // Bullet lists
  html = html.replace(/^\- (.*$)/gim, '<li class="ml-6 list-disc mb-1">$1</li>')
  html = html.replace(/^\* (.*$)/gim, '<li class="ml-6 list-disc mb-1">$1</li>')
  
  // Numbered lists
  html = html.replace(/^\d+\.\s(.*$)/gim, '<li class="ml-6 list-decimal mb-1">$1</li>')
  
  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-xl my-4 overflow-x-auto text-sm border font-mono"><code>$1</code></pre>')
  html = html.replace(/`(.*?)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded font-mono text-sm border-b">$1</code>')
  
  // Paragraph split
  const paragraphs = html.split('\n\n')
  return paragraphs.map(p => {
    // If it already contains markdown formatting headers or lists, keep it as is
    if (p.trim().startsWith('<li') || p.trim().startsWith('<h') || p.trim().startsWith('<blockquote') || p.trim().startsWith('<pre')) {
      return p
    }
    return p.trim() ? `<p class="mb-4 leading-relaxed text-muted-foreground">${p}</p>` : ''
  }).join('')
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [posts, setPosts] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'list' | 'editor' | 'settings'>('list')
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  
  // Default author settings (stored in localStorage)
  const [defaultAuthor, setDefaultAuthor] = useState({
    name: 'Emma Wilson',
    bio: 'Emma is a crochet designer and instructor with a passion for cozy patterns and texture.',
    image: 'https://res.cloudinary.com/dzmxgqty7/image/upload/v1779317562/Gemini_Generated_Image_9v35ii9v35ii9v35_twhpdz.png'
  })

  // Editor Form States
  const [postId, setPostId] = useState<string | null>(null)
  const [postTitle, setPostTitle] = useState('')
  const [postSlug, setPostSlug] = useState('')
  const [slugLocked, setSlugLocked] = useState(true)
  const [postDescription, setPostDescription] = useState('')
  const [postBody, setPostBody] = useState('')
  const [postDate, setPostDate] = useState('')
  const [postCategory, setPostCategory] = useState('Patterns')
  const [postTags, setPostTags] = useState<string[]>([])
  const [newTagInput, setNewTagInput] = useState('')
  const [postMetadata, setPostMetadata] = useState('Beginner')
  const [postReadingTime, setPostReadingTime] = useState(5)
  const [autoReadingTime, setAutoReadingTime] = useState(true)
  const [postFeatured, setPostFeatured] = useState(false)
  const [postPublished, setPostPublished] = useState(true)
  const [postCoverImage, setPostCoverImage] = useState('')
  const [postCoverImageAlt, setPostCoverImageAlt] = useState('')
  


  const bodyTextareaRef = useRef<HTMLTextAreaElement>(null)

  // Load auth state and local author configurations on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const auth = await isAdminAuthenticated()
        setIsAuthenticated(auth)
        if (auth) {
          await refreshPosts()
        }
      } catch (err) {
        console.error('Auth verification error:', err)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()

    const savedAuthor = localStorage.getItem('default_author')
    if (savedAuthor) {
      try {
        setDefaultAuthor(JSON.parse(savedAuthor))
      } catch (e) {
        console.error('Failed to parse default author settings', e)
      }
    }
  }, [])

  // Auto-calculate reading time based on body text length (approx 200 words per minute)
  useEffect(() => {
    if (autoReadingTime && postBody) {
      const words = postBody.trim().split(/\s+/).filter(w => w.length > 0).length
      const minutes = Math.ceil(words / 200) || 1
      setPostReadingTime(minutes)
    }
  }, [postBody, autoReadingTime])

  // Sync title to slug if slug is not locked
  useEffect(() => {
    if (!slugLocked) {
      setPostSlug(slugify(postTitle))
    }
  }, [postTitle, slugLocked])

  // Fetch/refresh posts list from database
  async function refreshPosts() {
    try {
      const allPosts = await getAdminPosts()
      setPosts(allPosts)
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to load posts.')
    }
  }

  // Handle Login submission
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setNotification(null)
    try {
      const success = await verifyAdminPassword(password)
      if (success) {
        setIsAuthenticated(true)
        showNotification('success', 'Logged in successfully!')
        await refreshPosts()
      } else {
        showNotification('error', 'Incorrect admin secret key.')
      }
    } catch (err: any) {
      showNotification('error', err.message || 'Error occurred during authentication.')
    } finally {
      setLoading(false)
    }
  }

  // Handle Logout
  async function handleLogout() {
    setLoading(true)
    try {
      await logoutAdmin()
      setIsAuthenticated(false)
      setPassword('')
      setPosts([])
      showNotification('success', 'Logged out successfully.')
    } catch (err: any) {
      showNotification('error', 'Logout failed.')
    } finally {
      setLoading(false)
    }
  }

  // Trigger temporary toast notification
  function showNotification(type: 'success' | 'error', message: string) {
    setNotification({ type, message })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  // Prepare states for editing an existing post
  function startEditPost(post: any) {
    setNotification(null)
    setPostId(post.id || null)
    setPostTitle(post.title)
    setPostSlug(post.slug)
    setSlugLocked(true)
    setPostDescription(post.description || '')
    setPostBody(post.body || '')
    setPostDate(post.date || new Date().toISOString().split('T')[0])
    setPostCategory(post.category || 'Patterns')
    setPostTags(post.tags || [])
    setPostMetadata(post.difficulty || 'Beginner')
    setPostReadingTime(post.reading_time ?? post.readingTime ?? 5)
    setAutoReadingTime(false)
    setPostFeatured(!!post.featured)
    setPostPublished(!!post.published)
    setPostCoverImage(post.cover_image ?? post.coverImage ?? '')
    setPostCoverImageAlt(post.cover_image_alt ?? post.coverImageAlt ?? '')
    

    
    setActiveTab('editor')
  }

  // Reset editor state for creating a new post
  function startNewPost() {
    setNotification(null)
    setPostId(null)
    setPostTitle('')
    setPostSlug('')
    setSlugLocked(false)
    setPostDescription('')
    setPostBody('')
    setPostDate(new Date().toISOString().split('T')[0])
    setPostCategory('Patterns')
    setPostTags([])
    setPostMetadata('Beginner')
    setPostReadingTime(5)
    setAutoReadingTime(true)
    setPostFeatured(false)
    setPostPublished(true)
    setPostCoverImage('')
    setPostCoverImageAlt('')
    

    
    setActiveTab('editor')
  }

  // Handle post saving (upsert)
  async function handleSavePost(e: React.FormEvent) {
    e.preventDefault()
    if (!postTitle || !postSlug || !postBody) {
      showNotification('error', 'Title, slug, and content body are required.')
      return
    }

    setActionLoading(true)
    setNotification(null)

    const finalPost = {
      ...(postId ? { id: postId } : {}),
      title: postTitle,
      slug: postSlug,
      description: postDescription,
      body: postBody,
      date: postDate,
      category: postCategory,
      tags: postTags,
      metadata: postMetadata,
      reading_time: postReadingTime,
      featured: postFeatured,
      published: postPublished,
      cover_image: postCoverImage,
      cover_image_alt: postCoverImageAlt || postTitle,
      author: defaultAuthor.name,
      author_bio: defaultAuthor.bio,
      author_image: defaultAuthor.image,
      last_modified: new Date().toISOString().split('T')[0]
    }

    try {
      await saveAdminPost(finalPost)
      showNotification('success', 'Article saved successfully and site cache revalidated!')
      await refreshPosts()
      setActiveTab('list')
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to save post.')
    } finally {
      setActionLoading(false)
    }
  }

  // Handle post deletion
  async function handleDeletePost(slug: string, title: string) {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return
    }

    setActionLoading(true)
    setNotification(null)

    try {
      await deleteAdminPost(slug)
      showNotification('success', `"${title}" has been deleted.`)
      await refreshPosts()
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete post.')
    } finally {
      setActionLoading(false)
    }
  }

  // Tag list helpers
  function addTag() {
    const formatted = newTagInput.trim().toLowerCase().replace(/\s+/g, '-')
    if (formatted && !postTags.includes(formatted)) {
      setPostTags([...postTags, formatted])
    }
    setNewTagInput('')
  }

  function removeTag(tagToRemove: string) {
    setPostTags(postTags.filter(t => t !== tagToRemove))
  }

  // Default author settings save
  function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault()
    localStorage.setItem('default_author', JSON.stringify(defaultAuthor))
    showNotification('success', 'Default author credentials saved locally.')
  }

  // Server-side Image Upload to Cloudinary helper
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, target: 'cover' | 'inline' | 'author' | 'defaultAuthor') {
    const file = e.target.files?.[0]
    if (!file) return

    setActionLoading(true)
    showNotification('success', 'Uploading image...')
    
    try {
      // Read file as base64
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        const base64 = reader.result as string
        try {
          const res = await uploadImage(base64)
          
          if (target === 'cover') {
            setPostCoverImage(res.url)
            showNotification('success', 'Cover image uploaded!')
          } else if (target === 'author') {
            setPostAuthorImage(res.url)
            showNotification('success', 'Author image uploaded!')
          } else if (target === 'defaultAuthor') {
            setDefaultAuthor({ ...defaultAuthor, image: res.url })
            showNotification('success', 'Default author profile image uploaded!')
          } else if (target === 'inline') {
            // Insert inline Markdown code at cursor position in textarea
            const textarea = bodyTextareaRef.current
            if (textarea) {
              const start = textarea.selectionStart
              const end = textarea.selectionEnd
              const insertText = `\n![${file.name.split('.')[0]}](${res.url})\n`
              const newBody = postBody.substring(0, start) + insertText + postBody.substring(end)
              setPostBody(newBody)
              
              // Refocus and place cursor after inserted text
              setTimeout(() => {
                textarea.focus()
                textarea.selectionStart = textarea.selectionEnd = start + insertText.length
              }, 10)
            } else {
              setPostBody(prev => prev + `\n![Image](${res.url})\n`)
            }
            showNotification('success', 'Inline image inserted into editor!')
          }
        } catch (uploadErr: any) {
          showNotification('error', uploadErr.message || 'Upload failed.')
        } finally {
          setActionLoading(false)
        }
      }
    } catch (err: any) {
      showNotification('error', 'Failed to read file.')
      setActionLoading(false)
    }
  }

  // Editor rich text formatting insert helpers
  function insertFormat(prefix: string, suffix = '') {
    const textarea = bodyTextareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = postBody.substring(start, end)
    const replacement = prefix + (selectedText || 'text') + suffix
    const newBody = postBody.substring(0, start) + replacement + postBody.substring(end)
    
    setPostBody(newBody)
    
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start + prefix.length
      textarea.selectionEnd = start + prefix.length + (selectedText || 'text').length
    }, 10)
  }

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (post.category && post.category.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Loading indicator on boot
  if (loading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="h-12 w-12 text-primary animate-spin" />
          <p className="text-muted-foreground text-sm">Verifying session...</p>
        </div>
      </div>
    )
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <Card className="w-full max-w-md bg-card/60 border-border backdrop-blur-xl relative z-10">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-serif text-3xl font-bold text-foreground">Cozy Stitches</CardTitle>
            <CardDescription className="text-muted-foreground">Admin Control Center</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {notification && (
                <Alert variant={notification.type === 'error' ? 'destructive' : 'default'} className="bg-destructive/10 border-destructive/20 text-destructive-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{notification.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
                  <AlertDescription>{notification.message}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-muted-foreground">Admin Secret Key</Label>
                <div className="relative">
                  <Input 
                    id="password"
                    type="password"
                    placeholder="Enter secret key..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary pr-10"
                    required
                  />
                  <div className="absolute right-3 top-2.5 text-muted-foreground">
                    <Lock className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold py-2 rounded-lg transition-colors">
                Unlock Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // MAIN ADMIN PANEL VIEW
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-card border-r border-border p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg text-foreground">Cozy Stitches</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Dashboard</p>
            </div>
          </div>

          <div className="h-px bg-muted" />

          {/* Navigation Links */}
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('list')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'list' 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/10' 
                  : 'text-muted-foreground hover:text-card-foreground hover:bg-muted/50'
              }`}
            >
              <FileText className="h-4 w-4" />
              All Articles
            </button>
            <button 
              onClick={startNewPost}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'editor' && !postId
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/10' 
                  : 'text-muted-foreground hover:text-card-foreground hover:bg-muted/50'
              }`}
            >
              <Plus className="h-4 w-4" />
              Write Article
            </button>
            {activeTab === 'editor' && postId && (
              <button 
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium bg-accent text-accent-foreground cursor-default"
              >
                <FileEdit className="h-4 w-4" />
                Editing Article
              </button>
            )}
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'settings' 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/10' 
                  : 'text-muted-foreground hover:text-card-foreground hover:bg-muted/50'
              }`}
            >
              <Settings className="h-4 w-4" />
              Author Profile
            </button>
          </nav>
        </div>

        <div className="space-y-4 pt-6 md:pt-0">
          <div className="h-px bg-muted" />
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 justify-start px-4 py-2.5 rounded-xl text-muted-foreground hover:text-red-400 hover:bg-red-500/10 text-sm font-medium transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {/* Notifications */}
        {notification && (
          <div className={`fixed bottom-5 right-5 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 border backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300 max-w-md ${
            notification.type === 'success' 
              ? 'bg-emerald-950/80 border-emerald-800 text-emerald-300' 
              : 'bg-red-950/80 border-red-800 text-red-300'
          }`}>
            {notification.type === 'success' ? <CheckCircle className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
            <span className="text-sm font-medium">{notification.message}</span>
            <button onClick={() => setNotification(null)} className="ml-auto hover:opacity-80">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* LIST TAB */}
        {activeTab === 'list' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="font-serif text-3xl font-bold">Articles</h2>
                <p className="text-sm text-muted-foreground">Manage, edit, or delete articles from your blog.</p>
              </div>
              <Button onClick={startNewPost} className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold flex items-center gap-2">
                <Plus className="h-4 w-4" /> Add New Article
              </Button>
            </div>

            <div className="flex items-center gap-3 max-w-md bg-card border border-border px-3 py-1 rounded-xl">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search by title, category, or slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 placeholder:text-muted-foreground text-card-foreground"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-muted-foreground hover:text-muted-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <Card className="bg-card border-border overflow-hidden shadow-xl">
              <CardContent className="p-0">
                {filteredPosts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-12 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mb-3" />
                    <h3 className="font-semibold text-lg">No Articles Found</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mt-1">
                      {searchQuery 
                        ? "We couldn't find any articles matching your search query." 
                        : "You haven't created any articles yet! Click 'Add New Article' to get started."}
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader className="bg-background border-b border-border">
                      <TableRow className="hover:bg-transparent border-border">
                        <TableHead className="w-[80px] text-muted-foreground">Cover</TableHead>
                        <TableHead className="text-muted-foreground">Title</TableHead>
                        <TableHead className="text-muted-foreground">Category</TableHead>
                        <TableHead className="text-muted-foreground">Date</TableHead>
                        <TableHead className="text-muted-foreground">Status</TableHead>
                        <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.map((post) => (
                        <TableRow key={post.slug} className="hover:bg-muted/30 border-border">
                          <TableCell>
                            {post.cover_image || post.coverImage ? (
                              <img 
                                src={post.cover_image || post.coverImage} 
                                alt={post.title} 
                                className="h-10 w-14 object-cover rounded-lg border border-border" 
                              />
                            ) : (
                              <div className="h-10 w-14 bg-muted rounded-lg border border-border flex items-center justify-center">
                                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-card-foreground line-clamp-1">{post.title}</div>
                            <div className="text-xs text-muted-foreground font-mono mt-0.5">/{post.slug}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-background border-border text-muted-foreground font-normal">
                              {post.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {post.date}
                          </TableCell>
                          <TableCell>
                            {post.published ? (
                              <Badge className="bg-emerald-500/10 border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/10">
                                Published
                              </Badge>
                            ) : (
                              <Badge className="bg-slate-500/10 border-slate-500/25 text-muted-foreground hover:bg-slate-500/10">
                                Draft
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => startEditPost(post)}
                                className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg"
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <a 
                                href={`/blog/${post.slug}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                                title="View Live"
                              >
                                <Eye className="h-4 w-4" />
                              </a>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDeletePost(post.slug, post.title)}
                                className="h-8 w-8 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* EDITOR TAB */}
        {activeTab === 'editor' && (
          <form onSubmit={handleSavePost} className="space-y-6">
            {/* Editor Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="cursor-pointer hover:text-card-foreground" onClick={() => setActiveTab('list')}>Articles</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground font-medium">{postId ? 'Edit Article' : 'New Article'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setActiveTab('list')}
                  className="hover:bg-muted text-muted-foreground font-medium"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={actionLoading}
                  className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold flex items-center gap-2"
                >
                  {actionLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {postId ? 'Update Article' : 'Publish Article'}
                </Button>
              </div>
            </div>

            {/* Split Form Layout */}
            <div className="grid lg:grid-cols-[1fr_320px] gap-8">
              
              {/* LEFT COLUMN: MAIN EDITOR */}
              <div className="space-y-6">
                
                {/* Title and Slug */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="title" className="text-muted-foreground font-medium">Article Title</Label>
                    <Input 
                      id="title"
                      type="text"
                      placeholder="e.g., Cozy Crochet Scarf for Beginners"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      className="bg-card border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary text-lg font-medium p-6"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="slug" className="text-muted-foreground font-medium flex items-center justify-between">
                      <span>Article URL Slug</span>
                      <button 
                        type="button" 
                        onClick={() => setSlugLocked(!slugLocked)}
                        className="text-xs text-muted-foreground hover:text-card-foreground flex items-center gap-1.5 bg-card border border-border px-2 py-0.5 rounded-lg"
                      >
                        {slugLocked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                        {slugLocked ? 'Locked (Auto)' : 'Unlocked (Manual)'}
                      </button>
                    </Label>
                    <div className="relative">
                      <Input 
                        id="slug"
                        type="text"
                        placeholder="cozy-crochet-scarf-for-beginners"
                        value={postSlug}
                        onChange={(e) => setPostSlug(slugify(e.target.value))}
                        disabled={slugLocked}
                        className="bg-card border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary font-mono text-sm pl-8 disabled:opacity-60"
                        required
                      />
                      <div className="absolute left-3 top-3 text-muted-foreground font-mono text-xs">/</div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="description" className="text-muted-foreground font-medium">Short Description</Label>
                    <Textarea 
                      id="description"
                      placeholder="Brief excerpt or pitch summarizing the article..."
                      value={postDescription}
                      onChange={(e) => setPostDescription(e.target.value)}
                      className="bg-card border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary min-h-[80px]"
                    />
                  </div>
                </div>

                {/* Markdown Text Editor & Preview Side-by-Side */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground font-medium">Article Content (Markdown / MDX)</Label>
                  
                  <Tabs defaultValue="edit" className="border border-border rounded-xl overflow-hidden bg-card shadow-lg">
                    <div className="bg-background border-b border-border px-4 py-2 flex flex-wrap justify-between items-center gap-4">
                      
                      {/* Edit vs Preview Toggle */}
                      <TabsList className="bg-card border border-border">
                        <TabsTrigger value="edit" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold px-4 text-xs py-1">
                          Editor
                        </TabsTrigger>
                        <TabsTrigger value="preview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold px-4 text-xs py-1">
                          Live Preview
                        </TabsTrigger>
                      </TabsList>

                      {/* Editor formatting toolbar */}
                      <div className="flex items-center gap-1 border-l border-border pl-4">
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => insertFormat('**', '**')} 
                          className="h-8 w-8 text-muted-foreground hover:text-card-foreground hover:bg-muted rounded-lg"
                          title="Bold"
                        >
                          <Bold className="h-4 w-4" />
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => insertFormat('*', '*')} 
                          className="h-8 w-8 text-muted-foreground hover:text-card-foreground hover:bg-muted rounded-lg"
                          title="Italic"
                        >
                          <Italic className="h-4 w-4" />
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => insertFormat('## ')} 
                          className="h-8 w-8 text-muted-foreground hover:text-card-foreground hover:bg-muted rounded-lg font-mono text-xs"
                          title="H2 Header"
                        >
                          <Heading2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => insertFormat('### ')} 
                          className="h-8 w-8 text-muted-foreground hover:text-card-foreground hover:bg-muted rounded-lg font-mono text-xs"
                          title="H3 Header"
                        >
                          <Heading3 className="h-4 w-4" />
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => insertFormat('- ')} 
                          className="h-8 w-8 text-muted-foreground hover:text-card-foreground hover:bg-muted rounded-lg"
                          title="Bullet List"
                        >
                          <List className="h-4 w-4" />
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => insertFormat('1. ')} 
                          className="h-8 w-8 text-muted-foreground hover:text-card-foreground hover:bg-muted rounded-lg"
                          title="Numbered List"
                        >
                          <ListOrdered className="h-4 w-4" />
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => insertFormat('[', '](url)')} 
                          className="h-8 w-8 text-muted-foreground hover:text-card-foreground hover:bg-muted rounded-lg"
                          title="Insert Link"
                        >
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                        
                        {/* Inline Image Uploader */}
                        <div className="relative">
                          <input 
                            id="inline-img-upload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'inline')}
                            className="hidden"
                          />
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon"
                            asChild
                            className="h-8 w-8 text-muted-foreground hover:text-card-foreground hover:bg-muted rounded-lg cursor-pointer"
                            title="Insert Image"
                          >
                            <label htmlFor="inline-img-upload">
                              <ImageIcon className="h-4 w-4" />
                            </label>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <TabsContent value="edit" className="m-0 p-0">
                      <Textarea 
                        ref={bodyTextareaRef}
                        id="body"
                        placeholder="Write your article in markdown. Use the toolbar buttons or inline image upload to speed up creation..."
                        value={postBody}
                        onChange={(e) => setPostBody(e.target.value)}
                        className="min-h-[500px] bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-sm leading-relaxed p-6"
                        required
                      />
                      <div className="bg-background border-t border-border px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>Words: {postBody.trim().split(/\s+/).filter(w => w.length > 0).length || 0}</span>
                        <span>Auto-calculate reading time: {postReadingTime} min read</span>
                      </div>
                    </TabsContent>

                    <TabsContent value="preview" className="m-0 p-6 min-h-[536px] bg-card max-h-[700px] overflow-y-auto">
                      {postBody ? (
                        <div 
                          className="prose prose-slate max-w-none text-card-foreground dark:prose-invert font-sans"
                          dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(postBody) }}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center py-20 text-muted-foreground">
                          <BookOpen className="h-10 w-10 mb-2 opacity-50" />
                          <p>Nothing to preview yet. Write some markdown content to render the preview here!</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* RIGHT COLUMN: SETTINGS PANEL */}
              <div className="space-y-6">
                
                {/* Publishing State Card */}
                <Card className="bg-card border-border shadow-lg">
                  <CardHeader className="pb-3 border-b border-border">
                    <CardTitle className="text-md font-bold">Publish Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    {/* Status switch */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="published" className="text-muted-foreground font-medium">Status</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{postPublished ? 'Published' : 'Draft'}</span>
                        <Switch 
                          id="published" 
                          checked={postPublished} 
                          onCheckedChange={setPostPublished}
                          className="data-[state=checked]:bg-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Featured switch */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="featured" className="text-muted-foreground font-medium">Featured Article</Label>
                      <div className="flex items-center gap-2">
                        <Switch 
                          id="featured" 
                          checked={postFeatured} 
                          onCheckedChange={setPostFeatured}
                          className="data-[state=checked]:bg-primary"
                        />
                      </div>
                    </div>

                    {/* Metadata Input */}
                    <div className="space-y-1.5">
                      <Label htmlFor="metadata" className="text-muted-foreground font-medium">Metadata</Label>
                      <Input 
                        id="metadata"
                        type="text"
                        placeholder="Enter metadata..."
                        value={postMetadata}
                        onChange={(e) => setPostMetadata(e.target.value)}
                        className="bg-background border-border text-foreground text-sm"
                      />
                    </div>

                    {/* Category Selection */}
                    <div className="space-y-1.5">
                      <Label htmlFor="category" className="text-muted-foreground font-medium">Category</Label>
                      <select 
                        id="category"
                        value={postCategory}
                        onChange={(e) => setPostCategory(e.target.value)}
                        className="w-full bg-background border border-border text-muted-foreground text-sm rounded-lg p-2 focus:ring-primary focus:border-primary focus:outline-none"
                      >
                        <option value="Patterns">Patterns</option>
                        <option value="Guides">Guides</option>
                        <option value="Tutorials">Tutorials</option>
                        <option value="Tips">Tips</option>
                        <option value="Inspiration">Inspiration</option>
                      </select>
                    </div>

                    {/* Date Picker */}
                    <div className="space-y-1.5">
                      <Label htmlFor="date" className="text-muted-foreground font-medium">Publish Date</Label>
                      <Input 
                        id="date"
                        type="date"
                        value={postDate}
                        onChange={(e) => setPostDate(e.target.value)}
                        className="bg-background border-border text-muted-foreground text-sm"
                        required
                      />
                    </div>

                    {/* Reading Time */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="readingTime" className="text-muted-foreground font-medium">Reading Time (min)</Label>
                        <button 
                          type="button" 
                          onClick={() => setAutoReadingTime(!autoReadingTime)}
                          className={`text-[10px] px-2 py-0.5 rounded-lg border transition-colors ${
                            autoReadingTime ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-background border-border text-muted-foreground'
                          }`}
                        >
                          Auto
                        </button>
                      </div>
                      <Input 
                        id="readingTime"
                        type="number"
                        min="1"
                        value={postReadingTime}
                        onChange={(e) => {
                          setPostReadingTime(parseInt(e.target.value) || 1)
                          setAutoReadingTime(false)
                        }}
                        disabled={autoReadingTime}
                        className="bg-background border-border text-muted-foreground text-sm disabled:opacity-60"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Cover Image Card */}
                <Card className="bg-card border-border shadow-lg">
                  <CardHeader className="pb-3 border-b border-border">
                    <CardTitle className="text-md font-bold">Cover Image</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    {/* Cover image uploader click box */}
                    <div className="space-y-1.5">
                      <div className="relative border-2 border-dashed border-border hover:border-border/80 transition-colors rounded-xl overflow-hidden h-40 bg-background flex flex-col items-center justify-center p-2 text-center group">
                        {postCoverImage ? (
                          <>
                            <img src={postCoverImage} alt="Cover preview" className="h-full w-full object-cover rounded-lg" />
                            <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-muted-foreground text-xs gap-1.5">
                              <Upload className="h-5 w-5 text-muted-foreground" />
                              Replace Cover Image
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-1 text-muted-foreground">
                            <Upload className="h-8 w-8 opacity-40 mb-1" />
                            <span className="text-xs font-medium">Click to upload cover image</span>
                            <span className="text-[10px] text-muted-foreground">Supports PNG, JPG, WEBP</span>
                          </div>
                        )}
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'cover')}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="coverImage" className="text-muted-foreground font-medium">Cover Image URL</Label>
                      <Input 
                        id="coverImage"
                        type="text"
                        placeholder="https://..."
                        value={postCoverImage}
                        onChange={(e) => setPostCoverImage(e.target.value)}
                        className="bg-background border-border text-muted-foreground text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="coverImageAlt" className="text-muted-foreground font-medium">Image Alt Text</Label>
                      <Input 
                        id="coverImageAlt"
                        type="text"
                        placeholder="Description of cover image..."
                        value={postCoverImageAlt}
                        onChange={(e) => setPostCoverImageAlt(e.target.value)}
                        className="bg-background border-border text-muted-foreground text-xs"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Tags Management Card */}
                <Card className="bg-card border-border shadow-lg">
                  <CardHeader className="pb-3 border-b border-border">
                    <CardTitle className="text-md font-bold">Tags</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    {/* Add Tag */}
                    <div className="flex gap-2">
                      <Input 
                        type="text" 
                        placeholder="Add tag..." 
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            addTag()
                          }
                        }}
                        className="bg-background border-border text-muted-foreground text-sm"
                      />
                      <Button type="button" onClick={addTag} size="sm" variant="secondary" className="hover:bg-muted">
                        Add
                      </Button>
                    </div>

                    {/* Tag list pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {postTags.length === 0 ? (
                        <span className="text-xs text-muted-foreground">No tags added yet. Press enter to add.</span>
                      ) : (
                        postTags.map(tag => (
                          <Badge key={tag} className="bg-background border-border text-muted-foreground hover:bg-muted gap-1 pr-1 pl-2">
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-400">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>


              </div>
            </div>
          </form>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="max-w-xl space-y-6">
            <div>
              <h2 className="font-serif text-3xl font-bold">Author Settings</h2>
              <p className="text-sm text-muted-foreground">Configure default author details that fill in automatically for new posts.</p>
            </div>

            <Card className="bg-card border-border shadow-xl">
              <form onSubmit={handleSaveSettings}>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="defaultAuthorName" className="text-muted-foreground font-medium">Default Author Name</Label>
                    <Input 
                      id="defaultAuthorName"
                      type="text"
                      placeholder="Emma Wilson"
                      value={defaultAuthor.name}
                      onChange={(e) => setDefaultAuthor({ ...defaultAuthor, name: e.target.value })}
                      className="bg-background border-border text-card-foreground"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="defaultAuthorBio" className="text-muted-foreground font-medium">Default Author Bio</Label>
                    <Textarea 
                      id="defaultAuthorBio"
                      placeholder="Emma Wilson is a..."
                      value={defaultAuthor.bio}
                      onChange={(e) => setDefaultAuthor({ ...defaultAuthor, bio: e.target.value })}
                      className="bg-background border-border text-card-foreground min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground font-medium">Default Author Profile Image</Label>
                    <div className="flex gap-4 items-center">
                      <div className="h-20 w-20 rounded-full border-2 border-border overflow-hidden bg-background shrink-0">
                        {defaultAuthor.image ? (
                          <img src={defaultAuthor.image} alt="Author Profile Preview" className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <User className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="relative">
                          <input 
                            id="default-author-img-upload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'defaultAuthor')}
                            className="hidden"
                          />
                          <Button 
                            type="button" 
                            variant="secondary" 
                            size="sm"
                            asChild
                            className="bg-background border-border text-muted-foreground text-xs hover:bg-muted cursor-pointer"
                          >
                            <label htmlFor="default-author-img-upload">
                              <Upload className="h-4 w-4 mr-1.5 inline" />
                              Upload New Profile Picture
                            </label>
                          </Button>
                        </div>
                        <Input 
                          type="text"
                          placeholder="Image URL..."
                          value={defaultAuthor.image}
                          onChange={(e) => setDefaultAuthor({ ...defaultAuthor, image: e.target.value })}
                          className="bg-background border-border text-muted-foreground text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-background border-t border-border py-4 flex justify-end">
                  <Button type="submit" className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold flex items-center gap-2">
                    <Save className="h-4 w-4" /> Save Default settings
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
