import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { Router, ActivatedRoute } from "@angular/router";
import { PostService } from "../post.service";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  blogPost: BlogPost;
  tags: string;
  private post;

  constructor(
    private data: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.post = this.data
    .getPostbyId(this.route.snapshot.params["id"])
    .subscribe((data) => {
      this.blogPost = data;
      this.tags = data.tags.toString();
    });
  }

  ngOnDestroy() {
    if (this.post) this.post.unsubscribe();
  }

  formSubmit() {
    this.blogPost.tags = this.tags.split(",").map((tag) => tag.trim());
    this.data
      .updatePostById(this.blogPost._id, this.blogPost)
      .subscribe(() => this.router.navigate(["/admin"]));
  }

  deletePost(id) {
    this.data
      .deletePostById(id)
      .subscribe(() => this.router.navigate(["/admin"]));
  }

}
