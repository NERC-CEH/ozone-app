
<h4> <%= obj.title %></h4>
<% if (obj.content) { %>
  <p> <%= obj.content %></p>
<% } %>
<p>Courtesy of <%= obj.source %></p>
<p>
  <img src="images/<%= obj.file %>" alt="Image illustrating the current topic."/>
</p>
