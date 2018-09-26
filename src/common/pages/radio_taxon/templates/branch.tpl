<li id="<%= obj.id %>-heading" 
  class="table-view-cell panel branch <%= (obj.otherSelected) ? 'grey' : '' %>">
    <a class="<%= obj.collapsed ? 'collapsed' : '' %> <%= (obj.otherSelected) ? 'grey' : '' %>" 
        data-toggle="collapse" data-parent="#<%= obj.parent %>"
        href="#<%= obj.id %>" aria-expanded="false" aria-controls="<%= obj.id %>" >
      <span class="icon icon-collapse pull-left"></span>
      <%= t(obj.title) %>
    </a>
    <ul id="<%= obj.id %>" class="table-view buttons collapse <%= (obj.collapsed) ? '' : 'in' %>" 
      aria-labelledby="<%= obj.id %>-heading" aria-expanded="false">
      <%
        if (obj.data.branches) {
          obj.data.branches.forEach(function(branch) {
            print(obj.branchTemplate({
              parent: obj.id,
              path: obj.path + '+' + branch.id,
              selected: obj.selected,
              collapsed: !(obj.selected && obj.selected.startsWith(obj.path + '+' + branch.id)),
              otherSelected: obj.otherSelected,
              branchTemplate: obj.branchTemplate,
              leafTemplate: obj.leafTemplate,
              id: branch.id,
              title: branch.title,
              data: branch,
            }));
          });
        }
        if (obj.data.leaves) {
          obj.data.leaves.forEach(function(leaf) {
            print(obj.leafTemplate({
              path: obj.path + '+' + leaf.title,
              selected: obj.selected,
              otherSelected: obj.otherSelected,
              id: leaf.id,
              title: leaf.title,
              subtitle: leaf.subtitle,
            }));
          });
        }
  
      %>
    </ul>
</li>
