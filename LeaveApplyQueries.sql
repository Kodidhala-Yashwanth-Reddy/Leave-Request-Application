
CREATE TABLE LeaveRequest (
    EmpId INT ,
	MngId INT,
	LevId Int Identity(1,1) primary key,
    EmpName NVARCHAR(255),
    EmpPhone NVARCHAR(20) ,
    ManagerName NVARCHAR(255) ,
    FromDate DATETIME ,
    ToDate DATETIME,
    TotalDays AS 
        DATEDIFF(DAY, FromDate, ToDate) + 1,
    Reason NVARCHAR(MAX) ,
    Status NVARCHAR(20) DEFAULT 'Pending' CHECK (Status IN ('Approved', 'Rejected', 'Pending'))
);

INSERT INTO LeaveRequest (EmpId, MngId, EmpName, EmpPhone, ManagerName, FromDate, ToDate, Reason, Status)
VALUES (1, 101, 'John Doe', '123-456-7890', 'Alice Manager', '2024-04-25', '2024-04-27', 'Vacation', 'Approved');

INSERT INTO LeaveRequest (EmpId, MngId, EmpName, EmpPhone, ManagerName, FromDate, ToDate, Reason, Status)
VALUES (2, 102, 'Jane Smith', '987-654-3210', 'Bob Manager', '2024-05-01', '2024-05-03', 'Sick leave', 'Pending');

INSERT INTO LeaveRequest (EmpId, MngId, EmpName, EmpPhone, ManagerName, FromDate, ToDate, Reason, Status)
VALUES (3, 103, 'Alice Johnson', '555-555-5555', 'Charlie Manager', '2024-06-10', '2024-06-15', 'Family emergency', 'Rejected');

select * from LeaveRequest

CREATE TABLE Employee (
    EmpId INT Primary Key,
    EmpName VARCHAR(100) ,
    EmpPhone VARCHAR(20) ,
    EmpEmail VARCHAR(100) ,
    EmpPassword VARCHAR(50),
	MngId INT ,
	ManagerName NVarchar(60)
);

-- Insert sample data into the employee table
INSERT INTO employee (EmpId, EmpName, EmpPhone, EmpEmail, EmpPassword,MngId,ManagerName)
VALUES
(1, 'John Doe', '1234567890', 'john@example.com', 'password123',Null,Null),
(2, 'Jane Smith', '9876543210', 'jane@example.com', 'securepass',1,'John Doe'),
(3, 'Alice Johnson', '5551234567', 'alice@example.com', 'p@ssw0rd',1, 'John doe');

-- Select all records from the employee table
SELECT * FROM employee;