import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define an interface for post metadata
interface PostMetadata {
  id: string;
  title: string;
  desc: string;
  auth: string;
  tags?: string[];
  upDate: string;
  writeDate: string;
  url: string;
}

// Directory where posts are located
const postsDirectory = path.join(process.cwd(), 'src/pages/posts');

// Function to parse a date string in DD.MM.YYYY format
function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split('.');
  return new Date(`${year}-${month}-${day}`);
}

// Function to get sorted posts with optional search query
export function getSortedPosts(searchQuery: string = ''): PostMetadata[] {

  // Read file names from the posts directory
  const fileNames = fs.readdirSync(postsDirectory);

  // Extract post data from each file
  const allPostsData: PostMetadata[] = fileNames.map((fileName: string) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as Omit<PostMetadata, 'id' | 'url'>), // Spread remaining metadata, excluding id and url
      url: `/posts/${id}`
    };
  });

  // Filter posts based on the search query
  const filteredPosts = allPostsData.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.auth.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  // Sort posts by date in descending order
  return filteredPosts.sort((a, b) => {
    const dateA = parseDate(a.upDate);
    const dateB = parseDate(b.upDate);

    return dateB.getTime() - dateA.getTime();
  });
}
