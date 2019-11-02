import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Comment, GetCommentsGQL, VoteGQL, VoteType} from '../../../../generated/graphql';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../../core/services/user.service';
import {CommonTypesService} from '../../../core/services/common-types.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit, OnDestroy {

  @Input() recipeId: string;

  comments: Comment[];
  loading: boolean = true;
  pageSize: number = 6;
  pageLength: number = 6;
  slicedComments: Array<Comment> = new Array<Comment>();
  private subscription: Subscription = new Subscription();

  constructor(private getCommentsGQL: GetCommentsGQL,
              private voteGQL: VoteGQL,
              private snackBar: MatSnackBar,
              private userService: UserService,
              private commonTypes: CommonTypesService) {
  }

  ngOnInit() {
    this.getComments();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  pageChangeEvent(event) {
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.slicedComments = this.comments.slice(offset).slice(0, event.pageSize);
    this.pageLength = this.comments.length;
  }


  private getComments() {
    this.subscription.add(this.getCommentsGQL
      .fetch({recipeId: this.recipeId})
      .subscribe(result => {
        this.loading = result.loading;
        this.comments = result.data.getComments;
        this.slicedComments = this.comments.slice(((0 + 1) - 1) * this.pageSize).slice(0, this.pageSize);
        this.pageLength = this.comments.length;
      }));
  }

  private vote(voteType: VoteType, comment: Comment) {
    this.subscription.add(this.voteGQL
      .mutate({userId: this.userService.user.userId, commentId: comment.commentId, voteType: voteType})
      .subscribe(result => {
        if (result.data.vote == null) {
          this.snackBar.open('You already voted!',
            'OK', {duration: 3000});
        }
        else{
          if(voteType == VoteType.Up){
            comment.rating.upVotes += 1;
          }
          else{
            comment.rating.downVotes +=1;
          }
        }
      }))
  }

}
