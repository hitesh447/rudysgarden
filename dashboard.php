<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: login.html");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Dashboard | Rudy's Gardens</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@400;500;700;800&display=swap" rel="stylesheet">
    <!-- Main CSS -->
    <link rel="stylesheet" href="style.css">
    <style>
        body { background-color: #f4f6f5; padding-top: 0; }
        .dashboard-header {
            background-color: var(--dark-green);
            color: white;
            padding: 20px 0;
            margin-bottom: 40px;
        }
        .dashboard-header .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .dashboard-header h1 {
            color: white;
            font-size: 1.5rem;
            margin: 0;
        }
        .dashboard-card {
            background: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            margin-bottom: 30px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
        }
        .form-control {
            width: 100%;
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-family: 'Inter', sans-serif;
        }
        .table-responsive {
            overflow-x: auto;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        th, td {
            text-align: left;
            padding: 15px;
            border-bottom: 1px solid #eee;
        }
        th {
            background-color: #f9f9f9;
            font-weight: 600;
        }
        .img-preview {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 5px;
        }
        .btn-sm {
            padding: 8px 15px;
            font-size: 0.85rem;
        }
        .btn-danger {
            background-color: #dc3545;
            color: white;
            border: none;
        }
        .btn-danger:hover {
            background-color: #c82333;
        }
    </style>
</head>
<body>

    <header class="dashboard-header">
        <div class="container">
            <h1>Rudy's Gardens Admin</h1>
            <div>
                <span style="margin-right: 15px;">Welcome, <?php echo htmlspecialchars($_SESSION['admin_username']); ?>!</span>
                <a href="api/logout.php" class="btn btn-outline" style="color: white; border-color: white; padding: 8px 20px;">Logout</a>
            </div>
        </div>
    </header>

    <div class="container">
        <div class="dashboard-card">
            <h2>Add New Portfolio Item</h2>
            <form id="addPortfolioForm" style="margin-top: 20px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="form-group">
                        <label>Project Title</label>
                        <input type="text" name="title" class="form-control" required placeholder="e.g. Modern Front Yard">
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select name="category" class="form-control" required >
                            <option value="Landscaping">Landscaping</option>
                            <option value="Hardscape">Hardscape</option>
                            <option value="Pools">Pools</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Image URL</label>
                    <input type="url" name="image_url" class="form-control" required placeholder="https://example.com/image.jpg">
                </div>
                <button type="submit" class="btn btn-primary" id="addBtn">Add Project</button>
                <span id="addMessage" style="margin-left: 15px; font-weight: 500;"></span>
            </form>
        </div>

        <div class="dashboard-card">
            <h2>Current Portfolio Items</h2>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Date Added</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="portfolioTableBody">
                        <tr><td colspan="5" style="text-align:center;">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        // Fetch and display items
        async function loadItems() {
            try {
                const response = await fetch('api/portfolio.php');
                const result = await response.json();
                const tbody = document.getElementById('portfolioTableBody');
                tbody.innerHTML = '';
                
                if (result.success && result.data.length > 0) {
                    result.data.forEach(item => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td><img src="${escapeHtml(item.image_url)}" class="img-preview" alt="Preview"></td>
                            <td style="font-weight: 500;">${escapeHtml(item.title)}</td>
                            <td><span class="badge" style="background:#eee; color:#333; font-size:0.8rem; padding: 5px 10px;">${escapeHtml(item.category)}</span></td>
                            <td>${new Date(item.created_at).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" onclick="deleteItem(${item.id})">Delete</button>
                            </td>
                        `;
                        tbody.appendChild(tr);
                    });
                } else {
                    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No portfolio items found.</td></tr>';
                }
            } catch (err) {
                console.error(err);
                document.getElementById('portfolioTableBody').innerHTML = '<tr><td colspan="5" style="color:red;">Error loading items.</td></tr>';
            }
        }

        // Add item
        document.getElementById('addPortfolioForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.target;
            const btn = document.getElementById('addBtn');
            const msg = document.getElementById('addMessage');
            
            btn.disabled = true;
            btn.textContent = 'Adding...';
            
            try {
                const response = await fetch('api/portfolio.php', {
                    method: 'POST',
                    body: new FormData(form)
                });
                const result = await response.json();
                
                if (result.success) {
                    msg.style.color = 'green';
                    msg.textContent = 'Project added successfully!';
                    form.reset();
                    loadItems(); // refresh table
                } else {
                    msg.style.color = 'red';
                    msg.textContent = result.message || 'Error adding project.';
                }
            } catch (err) {
                msg.style.color = 'red';
                msg.textContent = 'Connection error.';
            }
            
            btn.disabled = false;
            btn.textContent = 'Add Project';
            setTimeout(() => msg.textContent = '', 3000);
        });

        // Delete item
        async function deleteItem(id) {
            if (!confirm('Are you sure you want to delete this project?')) return;
            
            try {
                const response = await fetch('api/portfolio.php', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `id=${id}`
                });
                const result = await response.json();
                if (result.success) {
                    loadItems();
                } else {
                    alert(result.message || 'Error deleting item');
                }
            } catch (err) {
                alert('Connection error');
            }
        }

        // Utility to escape HTML
        function escapeHtml(unsafe) {
            return (unsafe || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        }

        // Initial load
        window.onload = loadItems;
    </script>
</body>
</html>
