FROM nginx:alpine
# Copy your index.html file to the Nginx public folder
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
