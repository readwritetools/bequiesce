# Hierarchy of Bequiesce objects

Bequiesce 						A singleton
	TestPackage[]				The user's test case files
		CodeSection[]			A section of Javascript code evaluated for each test case
			TestGroup[]			A collection of test cases that are similar in purpose and share a common name
				TestCase		A single line in the package that contains both the proposition and it proof
				
		
