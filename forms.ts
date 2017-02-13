import { ... } from '...';

@Component({
    selector: 'app-playground',
    templateUrl: './playground.component.html'
})
export class PlaygroundComponent implements OnInit {
    items: Entity[] = [];
    entities: Entity[];
    entity: Entity;
    private isNew = true;

    myForm: FormGroup;


    constructor(private playgroundService: PlaygroundService, formBuilder: FormBuilder) {
        // this.myForm = new FormGroup({
            // name: new FormControl('', Validators.required),
            // code: new FormControl('', Validators.required),
            // type: new FormControl('', Validators.required),
            // tags: new FormGroup({
            //     key: new FormControl(),
            //     value: new FormControl()
            // }),
            // assets: new FormArray([
            //     new FormControl('Stratford', Validators.required)
            // ])
        // });

        this.myForm = formBuilder.group({
            name: ['', Validators.required],
            code: ['', Validators.required],
            type: ['', Validators.required],
            tags: formBuilder.group({
                key: [''],
                value: ['']
            }),
            assets: formBuilder.array([
                ['', , this.asyncExampleValidator]
            ])
        });

        // this.myForm.valueChanges.subscribe(
        //     (data: any) => console.log(data) // every key stroke is logged
        // );

        // this.myForm.statusChanges.subscribe(
        //     (data: any) => console.log(data) // VALID, INVALID, PENDING...
        // )
    }

    onAddAsset() {
        (<FormArray>this.myForm.controls['assets']).push(new FormControl('', Validators.required, this.asyncExampleValidator));
    }

    onSubmit() {
        console.log(this.myForm);
        this.myForm.reset();
    }

    asyncExampleValidator(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>(
            (resolve, reject) => {
                setTimeout(() => {
                   if(control.value === 'Example') {
                      resolve ({'invalid': true});
                   } else {
                       resolve(null);
                   }
                },1500);
            }
        );
        return promise;
    }
}

/*
in the html component:

<form [formGroup]="myForm" (ngSubmit)="onSubmit()">
  <div>
        <div class="form-group">
            <label for="name">Name</label>
            <input type="" 
                   class="form-control"
                   id="name"
                   formControlName="name">
        </div>

        <div class="form-group">
            <label for="code">Code</label>
            <input type="text" 
                   class="form-control"
                   id="code"
                   formControlName="code">
        </div>

        <div class="form-group">
            <label for="code">Type</label>
            <input type="text" 
                   class="form-control"
                   id="type"
                   formControlName="type">
        </div>

        <h3>Tags</h3>
        <div formGroupName="tags">
            <div class="form-group">
                <label for="code">Tag name</label>
                <input type="text" 
                    class="form-control"
                    formControlName="key">
            </div>

            <div class="form-group">
                <label for="code">Tag value</label>
                <input type="text" 
                    class="form-control"
                    formControlName="value">
            </div>
        </div>

        <div formArrayName="assets">
            <h3>Assets</h3>
            <div class="form-group" 
                 *ngFor="let asset of myForm.controls['assets'].controls; let i = index">
                <input type="text"
                    class="form-control"
                    formControlName="{{i}}">
            </div>
        </div>
    </div>
    <button class="btn btn-default" type="button" (click)="onAddAsset()">Add Item</button>
    <button class="btn btn-primary" [disabled]="!myForm.valid">Submit</button>
</form>
*/
