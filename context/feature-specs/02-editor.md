We need the base chrome componenets that frame every editor screen - the top navbar and the left sideshell . These will be reused and extended in every chapter that follows.

### Editor Navbar
Create 'components/editor/editor-navbar.tsx

Requirments

-fixed-height top navbar
-left center and right sections 
-left section contains sidebar toggle button.
-use "PanelleftOpen"/PanelLeftclose' icons based on the sidebar state
-right section stays empty for now on.
-dark background with subtle bottom border.

### Project Sidebar

Create 'components/editor/project-sidebar.tsx

Requirments:

-sidebar should float above the editor canvas
-opening it should not push the page content.
-slide it from the left 
-accept "isOpen" prop
-header with "Projects" title + close button
-shadcn 'Tabs':
    -My Projects
    -Shared
-both tabs should show empty placeholder state
-full width 'New Project' button at the bottom with "Plus" icon.

### Dialog Pattern 

Use the existing older tokkens from 'global.css' for dialog styling

Support:
-title
-description
-footer actions

Do not build actual dialog yet.


### check when done

-new components compile without Typescript errors
-no lint errors
-dialog pattern is ready for future use.
-consistent styling that looks good.