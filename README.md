# Eclat DevOps Test

## Prerequisites

1. Minikube
2. kubectl
3. Docker
4. Helm

## Setup Cluster

```
minikube start

# Verify
kubectl cluster-info
kubectl get nodes

# Install nginx
minikube addons enable ingress
# Verify
kubectl get pods -n ingress-nginx
```

## Docker

```
docker build -t node-app:0.1 . --no-cache

# Verify
docker run -p 3000:3000 node-app:0.1
# Stop the test container
docker stop <container_id>

# Push the image to DockerHub
docker login
docker tag node-app:0.1 mohitsaxenadevops/eclat:0.1
docker push mohitsaxenadevops/eclat:0.1
```

## Helm

```
helm create node-app

# Change repo and tag in values.yaml
# Lint
helm lint

# Install
helm install node-app ./node-app

# Verify
kubectl get pods,svc,ingress
kubectl logs -l app.kubernetes.io/name=node-app
export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=node-app,app.kubernetes.io/instance=node-app" -o jsonpath="{.items[0].metadata.name}")
export CONTAINER_PORT=$(kubectl get pod --namespace default $POD_NAME -o jsonpath="{.spec.containers[0].ports[0].containerPort}")
kubectl --namespace default port-forward $POD_NAME 8080:$CONTAINER_PORT

# Now visit localhost:8080 to verify that the app is up
```

## Updates & Rollbacks

```
# Make changes to app.js
# Rebuild Dockerfile
docker build -t node-app:0.2 . --no-cache
docker tag node-app:0.2 mohitsaxenadevops/eclat:0.2
docker push mohitsaxenadevops/eclat:0.2

# Update
helm upgrade node-app ./node-app --set image.tag=0.2

# Rollback
helm rollback node-app 1
```

## Cleanup

```
helm uninstall node-app
kubectl delete ns ingress-nginx
```

## Prod Setup Recommendations

1. Use auto-scaling using HPA.
2. Use load balancer.
3. Enable HTTPS.
4. Set resource management rules.
5. Enable logging through CloudWatch.
6. Add health checks using liveliness probes, readiness probes, and load balancer.
7. Enable Blue-Green deployment.
8. Integrate CICD using ArgoCD.
9. Setup domain using DNS.