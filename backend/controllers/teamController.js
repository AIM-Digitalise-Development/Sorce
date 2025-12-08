import TeamMember from "../models/TeamMember.js";
import cloudinary from "../config/cloudinary.js";

// ✅ Create a New Team Member (Uploads to Cloudinary)
export const createTeamMember = async (req, res) => {
  try {
    const { name, role } = req.body;
    if (!name || !role || !req.file) {
      return res.status(400).json({ message: "Name, Role, and Image are required" });
    }

    const imageUrl = req.file.path; // Cloudinary returns the file URL

    const teamMember = await TeamMember.create({ name, role, imageUrl });
    res.status(201).json({ message: "Team member created successfully", teamMember });
  } catch (error) {
    console.error("Error creating team member:", error);
    res.status(500).json({ message: "Failed to create team member", error });
  }
};

// ✅ Get All Team Members
export const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find().sort({ createdAt: -1 });
    res.status(200).json(teamMembers);
  } catch (error) {
    console.error("Error fetching team members:", error);
    res.status(500).json({ message: "Failed to fetch team members", error });
  }
};

// ✅ Edit Team Member (Update Image, Name, Role)
export const editTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;
    const teamMember = await TeamMember.findById(id);

    if (!teamMember) return res.status(404).json({ message: "Team member not found" });

    if (req.file) {
      // ✅ Extract Cloudinary public ID
      const publicId = teamMember.imageUrl.split("/").pop().split(".")[0];

      if (publicId) {
        await cloudinary.uploader.destroy(`banners/${publicId}`);
      }

      // ✅ Update with new image
      teamMember.imageUrl = req.file.path;
    }

    teamMember.name = name || teamMember.name;
    teamMember.role = role || teamMember.role;

    await teamMember.save();
    res.status(200).json({ message: "Team member updated successfully", teamMember });
  } catch (error) {
    console.error("Error updating team member:", error);
    res.status(500).json({ message: "Failed to update team member", error });
  }
};

// ✅ Delete Team Member (Removes Image from Cloudinary)
export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await TeamMember.findById(id);
    if (!teamMember) return res.status(404).json({ message: "Team member not found" });

    // ✅ Extract Cloudinary public ID
    const publicId = teamMember.imageUrl.split("/").pop().split(".")[0];

    if (publicId) {
      await cloudinary.uploader.destroy(`banners/${publicId}`);
    }

    await teamMember.deleteOne();
    res.status(200).json({ message: "Team member deleted successfully" });
  } catch (error) {
    console.error("Error deleting team member:", error);
    res.status(500).json({ message: "Failed to delete team member", error });
  }
};
