import { Routes } from '@angular/router';
import { ThesisViewerComponent } from '../components/thesis-viewer/thesis-viewer.component';
import { ThesisListComponent } from '../components/thesis-list/thesis-list.component';

export const ROUTE_PATHS = {
    THESIS: "thesis",
    THESIS_REVIEW: `review/:id`,
    NAVIGATE_THESIS_REVIEW: (id: string) => `review/${id}`
}


export const routes: Routes = [
    {
        path: ROUTE_PATHS.THESIS, component: ThesisListComponent, children: [
            { path: ROUTE_PATHS.THESIS_REVIEW, component: ThesisViewerComponent }]
    },
    { path: '**', redirectTo: 'thesis' }
];
