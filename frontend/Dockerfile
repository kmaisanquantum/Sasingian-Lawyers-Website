FROM nginx:alpine
# Listen on port 4000 instead of the default 80
RUN sed -i 's/80/4000/g' /etc/nginx/conf.d/default.conf
# Copy from the frontend folder relative to the root
COPY frontend/index.html /usr/share/nginx/html/index.html
EXPOSE 4000
CMD ["nginx", "-g", "daemon off;"]
