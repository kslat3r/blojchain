provider "google" {
  credentials = "./creds.json"
  project = "blojchain-297012"
  region = local.region
}

data "google_container_registry_repository" "blojchain-container-registery" {}

resource "google_container_cluster" "blojchain-cluster" {
  name = "blojchain-cluster"
  location = local.zone
  initial_node_count = local.initial_node_count
  
  node_config {
    machine_type = local.machine_type
    disk_size_gb = local.disk_size_gb
    oauth_scopes = local.oauth_scopes
  }
}