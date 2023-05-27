class Person:
    """Represents a person."""

    def __init__(self, first_name, name, email):
        self.first_name = first_name
        self.name = name
        self.email = email

    def __str__(self):
        return f"{self.first_name} {self.name} ({self.email})"



class Directory:
    """Represents a directory of people."""

    def __init__(self):
        """Initializes a new directory."""
        self._persons = []

    def __str__(self):
        """Returns a string representation of the directory."""
        if not self._persons:
            return "empty directory"
        return str([str(person) for person in self._persons])

    def add(self, *L_of_person):
        """Adds new persons to the directory."""
        for dude in L_of_person:
            self._persons.append(dude)

directory = Directory()
directory.add(
    Person(first_name="Guido", name="van Rossom", email="bdfl@python.org"),
    Person(
        first_name="Adrian", name="Holovaty", email="bdfl@djangoproject.com"
    )
)
print(directory)