import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Article } from './../core/models/article.model';
import { Component, OnInit } from '@angular/core';
import { ArticlesService, Errors } from '../core';

@Component({
  selector: 'arw-editor',
  template: `
    <div class="editor-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <arw-list-errors [errors]="errors"></arw-list-errors>

            <form [formGroup]="articleForm">
              <fieldset [disabled]="isSubmitting">
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    formControlName="title"
                    type="text"
                    placeholder="Article Title"
                  />
                </fieldset>

                <fieldset class="form-group">
                  <input
                    class="form-control"
                    formControlName="description"
                    type="text"
                    placeholder="What's this article about?"
                  />
                </fieldset>

                <fieldset class="form-group">
                  <textarea
                    class="form-control"
                    formControlName="body"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                  >
                  </textarea>
                </fieldset>

                <fieldset class="form-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Enter tags"
                    [formControl]="tagField"
                    (keyup.enter)="addTag()"
                  />

                  <div class="tag-list">
                    <span
                      *ngFor="let tag of article.tagList"
                      class="tag-default tag-pill"
                    >
                      <i class="ion-close-round" (click)="removeTag(tag)"></i>
                      {{ tag }}
                    </span>
                  </div>
                </fieldset>

                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  (click)="submitForm()"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class EditorComponent implements OnInit {
  article: Article = {} as Article;
  articleForm: FormGroup;
  tagField = new FormControl();
  errors: Errors = {} as Errors;
  isSubmitting = false;

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.articleForm = this.fb.group({
      title: '',
      description: '',
      body: ''
    });

    // Initialized tagList as empty array
    this.article.tagList = [];

    // Optional: subscribe to value changers on the form
    // this.articleForm.valueChanges.subscribe(value => this.updateArticle(value))
  }

  ngOnInit(): void {
    // If there's an article prefetched, load it
    this.route.data.subscribe((data) => {
      if (data['article']) {
        this.article = data['article'];
        this.articleForm.patchValue(data['article']);
      }
    });
  }

  addTag() {
    // retrieve tag control
    const tag = this.tagField.value;
    // only add tag if it does not exist yet
    if (this.article.tagList.indexOf(tag) < 0) {
      this.article.tagList.push(tag);
    }
    // clear the input
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter(
      (tag) => tag !== tagName
    );
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateArticle(this.articleForm.value);

    // post the changes
    this.articlesService.save(this.article).subscribe(
      (article) => this.router.navigateByUrl('/article/' + article.slug),
      (err) => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  updateArticle(values: Article) {
    Object.assign(this.article, values);
  }
}
