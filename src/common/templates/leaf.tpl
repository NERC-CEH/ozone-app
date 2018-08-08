<% if (obj.file || obj.text) { %>
  <li class="table-view-cell">
    <% if (obj.file) { %>

      <a href="#photo/examples/<%= obj.file %>" class="navigate-right">
        <span class="media-object pull-left">
          <img src="images/thumbs/<%= obj.file %>.jpg" alt=""/>
        </span>
        <strong><%= obj.title %></strong><br/>
        <%= obj.subtitle %>
      </a>
    
    <% } else { 
      print(t(obj.text));
    } %>
  </li>
<% } %>