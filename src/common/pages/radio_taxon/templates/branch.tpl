<li id="<%= obj.id %>-heading" class="table-view-cell panel">
    <a class="collapsed" data-toggle="collapse" data-parent="#<%= obj.parent %>"
        href="#<%= obj.id %>" aria-expanded="false" aria-controls="<%= obj.id %>">
      <span class="icon icon-collapse pull-left"></span>
      <%= t(obj.title) %>
    </a>
    <ul id="<%= obj.id %>" class="table-view buttons collapse <%= (obj.selected && obj.selected.startsWith(obj.path + '+' + obj.id)) ? 'in' : '' %>" 
      aria-labelledby="<%= obj.id %>-heading" aria-expanded="false">
      <%
        if (obj.data.branches) {
          obj.data.branches.forEach(function(branch) {
            print(obj.branchTemplate({
              parent: obj.id,
              id: branch.id,
              title: branch.title,
              data: branch,
              branchTemplate: obj.branchTemplate,
              leafTemplate: obj.leafTemplate,
              path: obj.path + '+' + obj.id,
              selected: obj.selected,
              noPhotos: branch.noPhotos
            }));
          });
        }
        if (obj.data.leaves) {
          obj.data.leaves.forEach(function(leaf) {
            print(obj.leafTemplate({
              path: obj.path,
              parent: obj.id,
              id: leaf.id,
              title: leaf.title,
              subtitle: leaf.subtitle,
              file: leaf.photo,
              text: leaf.text,
            }));
          });
        }
  
      %>
    </ul>
</li>
