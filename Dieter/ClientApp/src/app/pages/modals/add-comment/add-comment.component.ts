import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AddCommentGQL, AddCommentInput} from '../../../../generated/graphql';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit, OnDestroy {

  comment: AddCommentInput;
  input: { authorUserId: string, recipeId: string };
  private subscription: Subscription = new Subscription();

  constructor(private snackBar: MatSnackBar,
              private addCommentGQL: AddCommentGQL,
              public dialogRef: MatDialogRef<AddCommentComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.input = data;
  }

  ngOnInit() {
    this.comment ={
      content: '',
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  cancel() {
    this.dialogRef.close({data: false});
  }

  addComment() {
    this.subscription.add(this.addCommentGQL
      .mutate({authorUserId: this.input.authorUserId, recipeId: this.input.recipeId, comment: this.comment})
      .subscribe(result => {
        if (result == null) {
          this.snackBar.open('Can\'t add comment!',
            'OK', {duration: 3000});
        } else {
          this.dialogRef.close({data: true});
        }
      }))
  }
}
