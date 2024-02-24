package com.example.probone.controller;

import org.springframework.web.bind.annotation.*;
import com.example.probone.model.CloudVendor;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cloudvendor")
public class CloudVendorAPIService {
    private List<CloudVendor> cloudVendors = new ArrayList<>();

    @GetMapping("/")
    public CloudVendor getCloudVendorDetails(@RequestParam String vendorId) {
        // Implement logic to fetch and return CloudVendor details based on vendorId
        return findCloudVendorById(vendorId);
    }

    @GetMapping("/all")
    public List<CloudVendor> getAllCloudVendors() {
        // Implement logic to fetch and return all Cloud Vendors
        return cloudVendors;
    }

    @PostMapping("/create")
    public String createCloudVendorDetails(@RequestBody CloudVendor cloudVendor) {
        // Implement logic to save the provided CloudVendor details
        cloudVendors.add(cloudVendor);
        return "Cloud Vendor Created Successfully";
    }

    @PutMapping("/edit/{id}")
    public String editCloudVendorDetails(@PathVariable String id, @RequestBody CloudVendor cloudVendor) {
        // Implement logic to edit the CloudVendor details based on id
        CloudVendor existingVendor = findCloudVendorById(id);
        if (existingVendor != null) {
            existingVendor.setName(cloudVendor.getName());
            existingVendor.setDescription(cloudVendor.getDescription());
            // Update other fields as needed
            return "Cloud Vendor Edited Successfully";
        } else {
            return "Cloud Vendor not found";
        }
    }

    @DeleteMapping("/delete/{id}")
    public String deleteCloudVendorDetails(@PathVariable String id) {
        // Implement logic to delete the CloudVendor details based on id
        CloudVendor vendorToDelete = findCloudVendorById(id);
        if (vendorToDelete != null) {
            cloudVendors.remove(vendorToDelete);
            return "Cloud Vendor Deleted Successfully";
        } else {
            return "Cloud Vendor not found";
        }
    }

    // Helper method to find CloudVendor by id
    private CloudVendor findCloudVendorById(String id) {
        return cloudVendors.stream()
                .filter(vendor -> vendor.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}
