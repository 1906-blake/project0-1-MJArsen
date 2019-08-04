
INSERT INTO employee (username, pass, first_name, last_name, email, roles)
VALUES 	('smarsh', 'pass', 'stan', 'marsh', 'stan.marsh@southparkelementary.edu', 3),
			('kbrofl', 'pass', 'kyle', 'broflovski','kyle.broflovski@southparkelementary.edu', 2),
			('ecart', 'pass', 'eric', 'cartman', 'eric.cartman@southparkelementary.edu', 1),
			('kmccor', 'pass', 'kenny', 'mccormick', 'kenny.mccormick@southparkelementary.edu', 4);
			
INSERT INTO roles (role) VALUES
	('The Coon'), ('Upper Cirle'), ('Heros'), ('Side Kicks'),
    ('employee'), ('admin'), ('finance-manager');
	
INSERT INTO reimbursement_type (reimbursement_type) VALUES
	('Costume'), ('Gadgets'),
	('Lair Repairs'), ('Lair Upgrades'),
	('Transportation'), ('Cheesy Poofs'), ('Other');
	
INSERT INTO reimbursement_status (status) VALUES
	('Pending'), ('Approved'), ('Denied');

INSERT INTO reimbursement(author, amount, date_submitted, date_resolved, description, resolver, status, reim_type)
	VALUES (1, 10.00, '2018-10-10', '2018-10-11', 'Cheesey Poofs', 1, 2, 6);