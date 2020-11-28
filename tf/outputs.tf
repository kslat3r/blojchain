output "gcr_location" {
  value = data.google_container_registry_repository.blojchain-container-registery.repository_url
}

output "get-credentials-cmd" {
  value = "gcloud container clusters get-credentials ${google_container_cluster.blojchain-cluster.name} --zone ${google_container_cluster.blojchain-cluster.location}"
}