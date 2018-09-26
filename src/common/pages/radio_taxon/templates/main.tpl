<div id="species-container">
  <div id="other-species" class="<%= (obj.otherSelected) ? '' : 'hidden' %>">
      <div class="info-message">
          <p>
            <%= 
              (obj.otherSelected) ?
                (obj.common_name + ': ' + t('What is the species name?')) : ''
            %>
          </p>
        </div>
        <div class="input-group">
          <input type="text" value="<%- obj['other-species'] %>" />
        </div>      
  </div>

  <div id="species">
    <ul id="accordion" class="table-view accordion <%= (obj.otherSelected) ? 'grey' : '' %>">
      <% 
        /*
          A hierarchy of nested collapsible lists will be created from an object 
          with the following properties:
          parent: id of parent <ul> needed by collapsible to work.
          path: + separated list of <ul> ids to current list.
          selected: the full path to a previously selected leaf or null.
          collapsed: whether a branch should be collapsed based on whether it is 
          in the path of selected.
          otherSelected: whether an other species option is selected. If it is,
          grey out parts of the accordion.
          branchTemplate: the template to use for nested branches (called recursively).
          leafTemplate: the template to use for the data in the lowest level of the list.
          id: the id of the branch <ul> or leaf <li> to create.
          title: the content to display for the <li>.
          data: the nested data from examples.data.json to build subsequent branches and leaves.
        */
        obj.data.branches.forEach(function(branch) {
          print(obj.branchTemplate({
            parent: 'accordion',
            path: 'species+' + branch.id,
            selected: obj.selected,
            collapsed: !(obj.selected && obj.selected.startsWith('species+' + branch.id)),
            otherSelected: obj.otherSelected,
            branchTemplate: obj.branchTemplate,
            leafTemplate: obj.leafTemplate,
            id: branch.id,
            title: branch.title,
            data: branch
          }));
        });
        obj.data.leaves.forEach(function(leaf) {
          print(obj.leafTemplate({
            path: 'species+' + leaf.title,
            selected: obj.selected,
            otherSelected: obj.otherSelected,
            id: leaf.id,
            title: leaf.title,
            subtitle: leaf.subtitle
          }));
        });
      %>
    </ul>
  </div>
</div>
