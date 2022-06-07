import { Paper, Typography } from "@material-ui/core";
import Image from "next/image";
import Link from "next/link";
import styles from "./Post.module.scss";
import { PostActions } from "../PostActions";

interface PostProps {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
}

export const Post: React.FC<PostProps> = ({
  id,
  title,
  description,
  imageUrl,
}) => {
  return (
    <Paper elevation={0} className="p-20" classes={{ root: styles.paper }}>
      <Typography variant="h4" className={styles.title}>
        <Link href={`/news/${id}`}>
          <a> {title}</a>
        </Link>
      </Typography>
      <Typography className="mt-15 mb-15">{description}</Typography>
      {imageUrl && <img src={imageUrl} alt={title} width={600} height={500} />}

      <PostActions />
    </Paper>
  );
};
